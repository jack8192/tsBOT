// Note. do NOT set a value to gl_tsBot when defining it
var gl_tsBot;
var gl_tsBot_ver;   // potentially set to a prior version number

//
// This version uses a low-level AJAX call to serialize gets of javascript.
//
// The loads occur asynchronously, but in a specific order.
// A synchronous version of this boot loader is avoided out of politeness
// and a desire to keep from hogging a browser's processor.
//
// This script is the object o a bookmark written as:
//
//    javascript:$.getScript("http:  etc.   ", function(a,b,c) {tsBot.load("http://localhost/ etc.")};);
//
// The bookmark is an AJAX/jQuery request that loads this text 
// and executes it as javascript.  However, since this javascript
// is just a function definition it will NOT execute.
//
// Luckily, getScript has a second parameter which is a callback function that 
// executes ONLY when getScript has successfully completed.
//
// The CAVEAT to all of this is that if getScript loads from an HTTPS resource
// then tsBot must be pointed to javascript stored on an HTTPS authorized website.
// Also, there is only ONE physical storage of the javascript code but IIS has
// two website definitions, one for HTTP and another for HTTPS, both of which
// point to the same set of physical folders and files.
//
// Having to define TWO sources in the bookmark allows the developer to store
// this code on a resource such as //rawgithub and then develop code 
// that resides on //localhost files, OR NOT!  
//
// Either way, this hinge is flexible, enough...
//
// Thus:
//
function load(in_httpPath: string, in_trace?:boolean) {
   
    // stack the url names for namespace source files
    var urls = new Array();

    //
    // this callback is specifically coded for being invoked
    // as a result of $.get that gets a javascript file from
    // a cross-domain server.
    //
    function completeCallback(jqXHR: any, status: string) {

        // if the current url at top of url stack
        // has loaded successfully, then pop that entry
        // off of the stack and get next script
        //
        if (status !== "success") {
            alert("url failed to load, reason is: " + status + ".");

            alert("status = " + status);

        }

        if (urls.length === 0) {
            //
            // no more urls to load for dynamically constructing the tsBot namesspace,
            // so run the bot!!
            //
            // this is the exit point of the recursive calls and
            // essentially completes a giant feedback loop!!
            //
            tsBot.run();  // run is defined in Mainline.ts source file

        } else {
            // please sir, can I have another url?
            // NO, you are a worthless human who does not deserve such a thing.
            // . . . but Mr. Dickens . . .
            getExecScript();
        }

    } // end of completeCallback
    

    //
    // getExecScript needs visibility of the urls stack
    //
    function getExecScript(url: string = urls.pop()) {

        //
        // complete is called AFTER script executes
        $.ajax({
            beforeSend: null, //function () { if (tsBot.trace) { alert("ready to $.ajax/get " + url); } },
            type: "GET",
            url: url,
            data: "",
            complete: completeCallback,
            dataType: "script"
        });

        //$.getScript(url, completeCallback).fail(function (a, b) { alert("getscript has failed"); });

        // hasn't happened, but a possibility
        //if (tsBot.trace) {
            //  alert("exiting async $.get of " + url);
        //}

    }; // end of getExecScript

    //
    // first chunk of executable code in this BootLoader,
    // Check global variables for a good, pristine environmen
    //

    try {
        gl_tsBot = (gl_tsBot === undefined) ? true : false;

        if (!gl_tsBot) { alert("\ntsBot ver " + gl_tsBot_ver + " has already  been loaded:\n   please refresh your \"plug.dj\" page and \n   invoke tsBot again.\n\nThank-you."); }

    }

    catch (e) {
        gl_tsBot = false;
        alert(e);

    }

    //
    // return if tsBot is NOT ok to load
    //
    if (!gl_tsBot) {
        return;
    }

    //
    // Note. The current version of tsBot should reflect its
    // accurate release number, and thus it SHOULD be set when defined.
    gl_tsBot_ver = 1.1;

    // this one field is at the end of this source code, so we have
    // addressability to this field in the tsBot namespace!!
    //
    // the bookmark determines the value of in_trace
    tsBot.httpPath = in_httpPath;
    tsBot.trace = in_trace;

    //
    // jQuery ver 1.11, so most stuff is possible...  Check this with:
    //     alert("jQuery version: " + $.fn.jquery + " is running on this page.");
    //

    //
    // Remember, callbacks don't resolve their parameters UNTIL they
    // are actually invoked.  A cheap way to pass parameters for these
    // callbacks is to store them uniquely in bootBot's namespace.
    //

    urls.push(tsBot.httpPath + "Mainline.js");
    urls.push(tsBot.httpPath + "Dispatcher.js");
    urls.push(tsBot.httpPath + "AdminFunctions.js");
    urls.push(tsBot.httpPath + "UserFunctions.js");
    urls.push(tsBot.httpPath + "TransactionClasses.js");   // Last In is First Out

    // this is what I want, only am going to use a stack!!
    //     getExecScript(urla, getexecscript(urlb, getexecscript(urlc, getexecscript(urld, null))));
    getExecScript();

    // NOTE.  urls and getExecScript are external to this routine, so that
    // when this code exits, before the actual urls are gotten, then the urls Array
    // and getExecScript do not go OUT OF SCOPE, (assuming that javascript does this)
    //

}  // end of load.ts

//
// Start the definition of the namespace for tsBot.  Note.  The loader
// takes advantage of the namespace being here to set the trace variable.
//
//
// Version 1.0 of Namespace.js: create an environment on/within
//      a Client's HTML browser for tsBot
//
namespace tsBot {
    //
    // these exports make it possible for code outside of the 
    // tsBot namespace to set and use information.
    //
    export var httpPath: string;
    export var trace: Boolean;

}

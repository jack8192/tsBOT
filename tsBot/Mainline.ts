namespace tsBot {
    //
    // Special Note.  This code is NOT encapsulated.
    // It is loaded by loadBot and runs under the auspices
    // of the browser's bookmark that i an initial
    // $.getScript that starts the chain of JavaScript code.

    //
    // Currently, this Bot is 99% event driven.
    //
    // The events are defined and supported by the dispatcher.
    //
    // This little bit of procedural logic is here to build
    // the necessary enviornment for the dispatcher and for
    // user functions.
    //
    export var dispatcher: Dispatcher;

    export function run() {

        //tsBot.trace = trace;

        // keep the user informed, for debugging purposes only
        //alert("executing tsBot.run(), trace = " + tsBot.trace);

        // establish the concept of having a dispatcher
        dispatcher = new tsBot.Dispatcher;

        // invoke function in UserFunctions to populate a table
        // of commands that is maintained ONLY by the dispatcher.
        //
        // Note. dispatcher MUST be constructed, via new, prior to
        // any external code that uses any of the dispather's public methods.
        //
        UserStartup();

        AdminUpdateOfCommandTable();

        // debug results of building the dispatcher
        dispatcher.listCommands();

        //
        // tsBot is now ready to converse with the API for plug.dj
        //
        API.sendChat("Starting tsBot version " + gl_tsBot_ver);
       
        //
        // Now, the pentultimate step:
        // load a file that contains statements that
        // execute in the global namespace and connect
        // tsBot to the API of plug.dj
        //
        // This step is done last because the above statements
        // are needed to build a starting environment within
        // the tsBot namespace. 
        //
        $.ajax({
            beforeSend: null,
            type: "GET",
            url: tsBot.httpPath + "Addendum.js",
            data: "",
            complete: null,
            dataType: "script"
        });

        //
        // The very last step is to remove the BootLoader from
        // global storage.  if possible.
        //

        //load = function () { };


    } // end of tsBot.run

} // end of tsBot namespace


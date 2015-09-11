//
// A user command is defined as any chat message that starts with
// a "!" and is immediately followed by text (the command's opcode)
// then a space and more text that functions as the command's data 
// or parameters.  The source module UserFunctions.ts is part of the
// tsBot namespace and contains most of the code that implements user
// commands.
//
// User commands are found by this bot thru the the API.CHAT event.
//
// Note.  There are admin commands that start with "/".  These 
// commands do NOT appear on the chat console.  Admin commands
// are trapped by the API.CHAT_COMMAND and are handled mostly by
// the AdminFunctions.ts source module.  This module is also
// part of the tsBot namespace.
//

namespace tsBot {

    //
    // User functions here:
    //
    export function abc(data: ChatMessage) {
        alert("executing the \"abc\" user command");
    }

    export function xyz(data: ChatMessage) {
        alert("executing the \"xyz\" user command");
    }

    //
    // get control directly from the API.on event definition
    //
    export function user_has_joined(data) {
        alert("a user has joined the community, data = " + data);
        API.sendChat("Everyone applaud, " + data.username + " is back!");
    }

    //
    // Note.  Do NOT use setInterval unless the timer ID
    // is maintained somewhere in common storage.
    //
    var gl_msgID: number;  // should be permamently stored in a Transaction Class
    function startUserScripts() {

        // separate function so that future logic
        // can be used here.
        //
        // Note. It would seem that this code is actually/probably
        // copied to elsewhere so that setInterval can use it after
        // startUserScipts has returned.
        //
        function sendAnnoyingMessage() {
            API.sendChat("more cowbell");
        }

        gl_msgID = setInterval(sendAnnoyingMessage, 60000);

    } // end of startUserScripts

    //
    // Stuff that helps the User's Application code run
    //
    export function UserStartup() {

        //
        // define and allocate entries in the command table
        //
        tsBot.dispatcher.addUserCommand("!abc", "abc");
        tsBot.dispatcher.addUserCommand("!xyz", "xyz");

        //
        // Invoke long-running asynchronous user scripts
        //
        startUserScripts();

    } // end of UserStartup

}  // end of UserFunctions.ts
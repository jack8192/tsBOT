namespace tsBot {

    //
    // Define a private version of a command
    //
    class command {

        EventCode: string;      // API.CHAT, etc.
        OpCode: string;         // /dothis or !dothis
        UserFunction: string;   // function ptr as text/string

        constructor(ec: string, cc: string, uf: string) {
            this.EventCode = ec;
            this.OpCode = cc;
            this.UserFunction = uf;

        }

    }

    //
    // Theoretically, the Dispatcher is NOT visible to UserFunctions.
    //
    // The application programmer (i.e. user) should only care about the
    // PublicClasses and UserFunctions source modules.
    //
    export class Dispatcher {

        // define private copy of an array of commands
        private cmdTable: command[];

        // add user command entries to cmdTable
        public addUserCommand = function (opcode: string, uf: any) {

            var newCommand: command = new command(API.CHAT, opcode, uf);

            this.cmdTable.push(newCommand);

            //alert("have just added the " + cc + " command to the command table.");

            //this.listCommands();


        } // end of addUserCommand

        // add Admin command entries to cmdTable
        public addAdminCommand = function (opcode: string, uf: any) {

            var newCommand: command = new command(API.CHAT_COMMAND, opcode, uf);

            this.cmdTable.push(newCommand);

        } // end of addUserCommand

        // for debugging, define a list function that displays
        // the contents of the command table
        public listCommands() {

            if (this.cmdTable.length === 0) {
                alert("Command table is empty");
                return;
            }

            var msg: string = "Command table has " + this.cmdTable.length + " entries:" + "\n";

            for (var idx = 0; idx < this.cmdTable.length; idx++) {

                msg += (idx+1) + ".  " + this.cmdTable[idx].EventCode + ",  " + this.cmdTable[idx].OpCode + ",  " +  this.cmdTable[idx].UserFunction + ";" + "\n";

            }

            alert(msg);

        } // end of list
        
        public parseChatMessage(in_code: string, in_data: ChatMessage) {

            if (in_data.message.charAt(0) === "!") {

                var words = in_data.message.split(" ", 2);

                this.findCommand(API.CHAT, words[0].toLowerCase(), in_data);

            }

        }  // end of parseChatMessage

        public parseChatCommand(in_code: string, in_data: string) {

            var words: string[] = [];

            if (in_data[0].charAt(0) === "/") {

                words = in_data.split[" ", 2];

                this.findCommand(API.CHAT_COMMAND, words[0].toLowerCase(), words[1]);

            }

        }

        //
        // Search the command table in order and call each user function
        // that matches in_code.  This is, in effect, a giant switch statement
        // without any breaks within the matching cases.
        //
        private findCommand(in_Event: string, in_OpCode: string, in_object: any) {

            for (var idx = 0; idx < this.cmdTable.length; idx++) {

                if (this.cmdTable[idx].EventCode === in_Event) {
                    if (this.cmdTable[idx].OpCode === in_OpCode) {

                        // build the call to the user or admin function
                        var evalString = "tsBot." + this.cmdTable[idx].UserFunction + "(in_object);";

                        //
                        // bracket the invoking of a user function for various reasons
                        //
                        try {
                            eval(evalString);
                        }

                        catch (e) {
                            alert(e);
                        }

                        // there is only one function to invoke per command or message
                        break;
                    }

                }

            } // end for

        }  // end of runFunctions

        // Build the CommandTable when it is first allocated
        constructor() {
            
            //
            this.cmdTable = new Array;

        }

    }  // end of Dispatcher class

}  // end of Dispatcher.js within the tsBot namespace

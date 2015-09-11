
//
//  Implemant Administrator Functions
//
//  Note. These are commands that start with a "/"
//
//
namespace tsBot {

    //
    //   listapi
    //
    function listAPI(fName: string) {

        var keyString = Object.getOwnPropertyNames(API);
        var isFunction: number = 0;

        var fnStr = "";
        var msg = "namespace API {\n\n";
        for (var idx in keyString) {
            fnStr = eval("API." + keyString[idx] + ".toString()");

            isFunction = fnStr.indexOf("{");
            if (isFunction > 0) {
                msg += "export var " + keyString[idx] + " = " + fnStr.substring(0, isFunction) + "{}" + "\n";
            } else {
                msg += "export var " + keyString[idx] + " = " + '"' + fnStr + '";' + "\n";
            }
        }

        msg += "} // end of API namespace";

        console.log(msg);

    } // end of listAPI

    //
    //  /admin
    //
    function admin() {

        alert("logic for /admin function executes here");

    }

    //
    //
    //
    export function AdminUpdateOfCommandTable() {

        //alert("updating command table with admin commands");

        tsBot.dispatcher.addAdminCommand("/listAPI", "listAPI");
        tsBot.dispatcher.addAdminCommand("/admin", "admin");
    }


} // end of AdminFunctions.ts

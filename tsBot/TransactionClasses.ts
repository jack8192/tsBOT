namespace tsBot {

    
    //
    //  The following classes are used by UserFunctions. . . 
    //

    export class ChatMessage {
        mtype: string;   // "message", "emote", "moderation", "system"

        un: string;      // the username of the sender

        uid: number;    // the user id of the sender

        message: string // the chat message

    }


}  // end of namespace tsBot within PublicClasses
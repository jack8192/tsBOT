//
// the following code is in the global script portion of the client's browser.
//
// This is so that the API.on statements are never deallocated,
// which would occur if they were housed within a function
//

//
// Establish callbacks for API events from client.  
//
// There should be ONE API.on invocation for each
// type of API Event.
//
// From here, visibility into tsBot is explicitely 
// established.
//
API.on(API.CHAT, function (data) { tsBot.dispatcher.parseChatMessage(API.CHAT, data); });
API.on(API.CHAT_COMMAND, function (data) { tsBot.dispatcher.parseChatCommand(API.CHAT_COMMAND, data); });

API.on(API.USER_JOIN, tsBot.user_has_joined);

/*
API.on(API.CHAT, function (data) { tsBot.dispatcher.runFunctions(API.CHAT, data); });
API.on(API.CHAT_COMMAND, function (data) { tsBot.dispatcher.runFunctions(API.CHAT_COMMAND, data); });
*/
/*
API.on(API.CHAT_COMMAND, function (data) { tsBot.dispatcher.runFunctions(API.CHAT_COMMAND, data); });
API.on(API.FRIEND_JOIN, function (data) { tsBot.dispatcher.runFunctions(API.FRIEND_JOIN, data); });
*/


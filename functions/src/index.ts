import * as functions from "firebase-functions";

exports.createChatEngineUser = functions.auth.user().onCreate((user) => {
  console.log("create", user);
});

exports.deleteChatEngineUser = functions.auth.user().onDelete((user) => {
  console.log("delete", user);
});



const lobbyUserMessage = require("gopaisa-models").mongoModels.lobbyUserMsg;
const lobbyUser = require("gopaisa-models").mongoModels.lobbyUser;

module.exports = {
    saveMessage: (sender, receiver, message, priority) => {
        return lobbyUserMessage.create({
            sender,
            receiver,
            messageText: message,
            messagePriority: priority
        })
    },
    getTenMessage: () => {
        return lobbyUserMessage.find().sort({createdAt:-1})
    },
    removeCurrentMessage: (time,username,message) =>{
        
        const timeDateObject = new Date(time);
      
        return lobbyUserMessage.deleteOne({createdAt:timeDateObject,sender:username,messageText:message})
        .then((result) => {
            if (result.deletedCount > 0) {
              console.log("Message deleted successfully!");
            } else {
              console.log("Message not found or already deleted.");
            }
          })
          .catch((error) => {
            console.error("Error deleting message:", error);
          });
    },
    isAlreadyUser: (name,email) => {
        return lobbyUser.findOne({userName:name,email:email})
    }
    

}
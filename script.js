const lobbyUserMessage = require("gopaisa-models").mongoModels.lobbyuserMessage;

module.exports = {
    saveData: (sender, receiver, message, priority) => {
        return lobbyUserMessage.create({
            sender,
            receiver,
            messageText: message,
            messagePriority: priority
        })
    },
    getData: () => {
        return lobbyUserMessage.find().lean()
    }

}
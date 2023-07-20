
const lobbyUserMessage = require("gopaisa-models").mongoModels.lobbyuserMessage;
const lobbyUser = require("gopaisa-models").mongoModels.lobbyUser;
module.exports = {


renderIndex: async (req, res) => {
    try {
       return res.render('index')
    } catch (error) {
        
        return res.status(500).send("Server Error");
    }
},
renderRoom: async (req, res) => {
    try {
       res.render('room')
    } catch (error) {
        
        return res.status(500).send("Server Error");
    }
},
checkRoom: async (req, res) => {
    try {
      
   let {email,username} = req.body;
    if( !email || !username){
        return res.status(404).send("MissinG Fields")
    }
    let checkUser  = await lobbyUser.findOne({
        email:email
    })
    
    if(!checkUser){
        await lobbyUser.create({
            userName:username,
            email:email
        })
    }
    res.status(200).json({ username });
   
    } catch (error) {
        
        return res.status(500).send("Server Error");
    }
},
}
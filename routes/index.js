const router = require("express").Router();
const socketController = require("../controller/socketController")


  

router.get('/room',socketController.renderRoom)
router.post('/room',socketController.checkRoom)



router.use('/',socketController.renderIndex)









module.exports = router;
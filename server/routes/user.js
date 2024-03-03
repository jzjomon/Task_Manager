const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.js');
const { getTasks, setTask, deleteTask, getTask , updateTask} = require('../controllers/user.js');

router.get("/getTasks", auth,  getTasks)
router.post("/setTask", auth, setTask)
router.post("/deleteTask", auth, deleteTask)
router.post("/getTask", auth, getTask)
router.post("/updateTask", auth, updateTask)
 
module.exports = router
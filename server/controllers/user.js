const TASK = require('../models/task.js')

const getTasks = (req, res) => {
    try {
        TASK.find({ userId : req.userId}).then((result) => {
            res.status(200).json({ message : "success", data : result})
        }).catch((err) => {
            res.status(400).json({ message : "cannot find the tasks"})
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const setTask = (req, res) => {
    try {
        TASK({ userId : req.userId, title : req.body.title, description : req.body.description, dueDate : req.body.dueDate}).save().then((result) => {
            res.status(200).json({ message : "success"})
        }).catch((err) => {
            res.status(400).json({ message : "cannot set the task"});
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const deleteTask = (req, res) => {
    try {
        TASK.findOneAndDelete({ _id : req.body.id}).then((result) => {
            res.status(200).json({ message : "success"})
        }).catch((err) => {
            res.status(400).json({ message : "cannot delete task"})
            
        });  
    } catch (error) {  
        res.status(500).json({ message: "Something went wrong" })
    }
}

const getTask = (req, res) => {
    try {
        TASK.findOne({ _id : req.body.id}).then((result) => {
            res.status(200).json({ message : "success" , data : result})
        }).catch((err) => {
            res.status(400).json({ message : "cannot get task"})
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const updateTask = (req, res) => {
    try {
        TASK.findOneAndUpdate({ _id : req.body.id }, { title : req.body.task.title, description : req.body.task.description, dueDate : req.body.task.dueDate  }).then((result) => {
        res.status(200).json({ message : "success"})
        }).catch((err) => {
            res.status(400).json({ message : "cannot update task"})
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

module.exports = { getTasks, setTask, deleteTask , getTask, updateTask}
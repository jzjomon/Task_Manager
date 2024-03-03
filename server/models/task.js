const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    userId : {
        type : mongoose.Types.ObjectId
    },
    title : {
        type : String,
    },
    description : {
        type : String
    },
    dueDate : {
        type : String
    }
}, {
    timestamps : true
});

const taskModle = mongoose.model('Task', taskSchema);

module.exports = taskModle;
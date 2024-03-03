const mongoose = require('mongoose');

const connectDb = () => {
    try {
        mongoose.connect(process.env.MONGOURL).then((result) => {
            console.log("mongodb connection established");
        }).catch((err) => {
            console.log("mongodb connection error");
        });
    } catch (error) {
        console.log('cannot connect to mongodb');
    }
};

module.exports = connectDb;
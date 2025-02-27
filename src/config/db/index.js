const mongoose = require('mongoose');
async function connect(){
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/dqa_nodejs_dev1');
        console.log('Connection Successfully!');
    } catch (error) {
        console.log('Connection Failed!');
    }
};

module.exports = { connect };
const mongoose = require('mongoose');
async function connect(){
    try {
        await mongoose.connect('mongodb+srv://dqa0604:dqa0604@cluster.jtbsa.mongodb.net/dqa_nodejs_dev1?retryWrites=true&w=majority&appName=Cluster');
        console.log('Connection Successfully!');
    } catch (error) {
        console.log('Connection Failed!');
    }
};

module.exports = { connect };
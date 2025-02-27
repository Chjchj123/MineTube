const mongoose = require('mongoose');
async function connect(){
    try {

        mongoose.connect('mongodb://127.0.0.1:27017/dqa_nodejs_dev1', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 150000 // Tăng timeout lên 15 giây
          })
          .then(() => console.log("MongoDB connected"))
          .catch(err => console.error("MongoDB connection error:", err));
        console.log('Connection Successfully!');
    } catch (error) {
        console.log('Connection Failed!');
    }
};

module.exports = { connect };
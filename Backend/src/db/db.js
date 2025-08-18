const mongoose = require('mongoose');

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('DB Connected Successfully!');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB
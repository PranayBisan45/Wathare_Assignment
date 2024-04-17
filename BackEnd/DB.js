const mongoose = require('mongoose');
require('dotenv/config');
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connected !!!!`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;
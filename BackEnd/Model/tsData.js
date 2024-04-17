const mongoose = require('mongoose');

const tsDataSchama = new mongoose.Schema({
    ts:{
        type:String,
        required:true
    },
    machine_status:{
        type:Number
    },
    vibration:{
        type:Number,
        default:0
    }
});
const tsData = mongoose.model('tsData', tsDataSchama);
module.exports = tsData;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = {
    name:{
        type:String,
        required: true
    },
    type:{
        type:String,
        default:'SENSOR'
    },
    status:{
        type:Number,
        default: 0
    }
}

const DeviceShema = new Schema(config);

module.exports=mongoose.model('Device',DeviceShema);

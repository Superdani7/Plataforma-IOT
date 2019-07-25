const mongoose = require('mongoose');
const DeviceModel = mongoose.model('Device');
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

require('dotenv').config({ path: '../variables.env'});

module.exports.createDevice = function(req,res){
    const name = req.body.name;
    const type = req.body.type;
    if(!name){
        res.status(400).send('Missing name');
    }
    const newDevice = new DeviceModel({
        name: name,
        type: type
    });
    newDevice.save().then(function(device){
        if(device){
            res.status(200).send('Device Created');
        }
        else{
            res.status(400).send('Device NOT Created');
        }
    });
};
module.exports.getDevices = function(req, res){
    DeviceModel.find({}).then(function(devices){
        res.json(devices);
    });
};
module.exports.getDeviceById = function(req,res){
    const deviceId = req.query.deviceId
    DeviceModel.findById(deviceId).then(function(device){
        if(device){
            res.json(device);
        }
        else{
            res.status(404).send('No device found with this ID');
        }
    })
    .catch(function(error){
        res.status(400).send(error);
    });
};
module.exports.updateDevice = function(req,res){
    const deviceId = req.body.deviceId;
    const newStatus = req.body.status;

    DeviceModel.findByIdAndUpdate(deviceId, {status:newStatus}).then(function(device){
        if(device){
        res.status(200).send('Device Updated');
        }
        else{
            res.status(400).send('Device NOT Updated');
        }

    });
};


module.exports.sendEmail = function(req,res) {
    const deviceId = req.body.deviceId;
    const date = new Date();
    const formattedDate = date.toISOString();
    const msg = {
        from: 'alumno07@techtalents.club',
        to: 'daniel.vil.cos@techtalents.club',
        subject: `${formattedDate} ' || New alert from device:  ${deviceId}`,
        html: `<img href="https://thumbs-prod.si-cdn.com/H7aVwwcff-NyQDH0opXs7a6BDUg=/800x600/filters:no_upscale()/https://public-media.si-cdn.com/filer/a3/a5/a3a5e93c-0fd2-4ee7-b2ec-04616b1727d1/kq4q5h7f-1498751693.jpg">ye</img>`
    };
//The device with ID: ${deviceId} sent you an alert at ${formattedDate}
    sgMail.send(msg).then(function(message){
        console.log(message);
        if(message){
            res.status(200).send('Email Sent')
        }
    });
        
};

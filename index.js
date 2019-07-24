const express = require('express');
const mongooose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config({path:'./variables.env'});
require('./Models/Device');
require('./Models/Data');

const app = express();


mongooose.connect(process.env.DATABASE);
mongooose.connection.on('error', function(error){
    console.log('Database error', error);
});

app.use(bodyParser());
app.use(cors());


app.get('/',function(req,res){
    res.send('It works');
});

const routes = require('./Routes/routes');

app.use('/', routes);

app.listen(process.env.PORT, function(){
    console.log('App listening on port', process.env.PORT);
});
const Joi = require('joi');
const EventEmmiter = require('events');
const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());

const TestApplication = require('./middleware/logger');
const tasks = require('./routes/tasks')

const exp = require('constants');
const testapplication = new TestApplication();
testapplication.on('loadApplication', (arg)=>{
    fs.appendFile('logger.txt', 'Application loaded!\n' ,(err)=>{
        if(err){
            throw err;
        }else{
           console.log(arg);
        }
    });
}); 
testapplication.loadApplication('Application is Loading...');


const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));




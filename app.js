const EventEmmiter = require('events');
const fs = require('fs');

const TestApplication = require('./logger');
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
const Joi = require('joi');
const EventEmmiter = require('events');
const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());

const tasks =[{id:1, task:'Complete A9-2'}]



const TestApplication = require('./logger');
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
function validateTask(task){
    const schema = {
        task: Joi.string().min(3).required()
    };
    return Joi.validate(task, schema);
}

app.post('/api/tasks', (req, res)=>{
    const { error } = validateTask(req.body)
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const task ={
        id: tasks.length +1,
        task: req.body.task
    };
    tasks.push(task);
    res.send(task);
});

app.delete('/api/tasks/:id', (req, res)=>{
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if(!task)return res.status(404).send('The task with the given ID was not found.');

    const index = tasks.indexOf(task);
    tasks.splice(index, 1);

    res.send(task);
});

app.get('/api/tasks',(req,res)=>{
    res.send(tasks);
});
app.get('/api/tasks/:id', (req,res)=>{
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if(!task)return res.status(404).send('The task with the given ID was not found.');

    res.send(task);
});

app.put('/api/tasks/:id',(req, res)=>{
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if(!task)return res.status(404).send('The task with the given ID was not found.');

    const { error } = validateTask(req.body)
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    task.task = req.body.task;
    res.send(task); 

});



const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));




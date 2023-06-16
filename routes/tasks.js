const Joi = require('joi');
const express = require('express');

const router = express.Router();
router.use(express.json());

const tasks =[{id:1, task:'Complete A9-2'}]

function validateTask(task){
    const schema = {
        task: Joi.string().min(3).required()
    };
    return Joi.validate(task, schema);
}

router.post('/api/tasks', (req, res)=>{
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

router.delete('/api/tasks/:id', (req, res)=>{
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if(!task)return res.status(404).send('The task with the given ID was not found.');

    const index = tasks.indexOf(task);
    tasks.splice(index, 1);

    res.send(task);
});

router.get('/api/tasks',(req,res)=>{
    res.send(tasks);
});
router.get('/api/tasks/:id', (req,res)=>{
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if(!task)return res.status(404).send('The task with the given ID was not found.');

    res.send(task);
});

router.put('/api/tasks/:id',(req, res)=>{
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
module.exports = router;
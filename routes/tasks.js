const { Task, validate } = require("../models/tasks");

const express = require("express");
const mongoose = require("mongoose");
const { User } = require("../models/users");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const { Severity } = require("../models/severitys");

const router = express.Router();
router.use(express.json());
// removed /me and auth
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const severity = await Severity.findById(req.body.severityId);
  if (!severity) return res.status(400).send("Invalid severity.");

  const task = new Task({
    title: req.body.title,
    task: req.body.task,
    additionalInfo: req.body.additionalInfo,
    category: req.body.category,
    severity: {
      _id: severity._id,
      name: severity.name,
    },
    completed: false,
  });
  try {
    const result = await task.save();
    res.send(result);
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  const task = await Task.findByIdAndRemove(req.params.id);

  if (!task)
    return res.status(404).send("The task with the given ID was not found.");

  res.send(task);
});

// router.get('/me',auth, async (req,res)=>{
//     const task = await Task.find({_id: req.params._id});
//     res.send(task);
// });
/* router.get("/me", auth, async (req, res) => {
  const task = await Task.find({ user: req.user._id });
  res.send(task);
}); */
router.get("/", async (req, res) => {
  const task = await Task.find();
  res.send(task);
});
router.get("/:id", validateObjectId, async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task)
    return res.status(404).send("The task with the given ID was not found.");

  res.send(task);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const severity = await Severity.findById(req.body.severityId);
  if (!severity) return res.status(400).send("Invalid severity.");

  const task = await Task.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      task: req.body.task,
      category: req.body.category,
      severity: {
        _id: severity._id,
        name: severity.name,
      },
      completed: req.body.completed,
    },
  });

  if (!task)
    return res.status(404).send("The task with the given ID was not found.");

  res.send(task);
});

module.exports = router;

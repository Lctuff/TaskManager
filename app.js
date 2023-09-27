const Joi = require("joi");
const EventEmmiter = require("events");
const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");

const TestApplication = require("./middleware/logger");
const tasks = require("./routes/tasks");
const users = require("./routes/users");
const severitys = require("./routes/severitys");

const app = express();
require("./routes/cors")(app);
app.use(express.json());
app.use(express.urlencoded());
app.use("/api/tasks", tasks);
app.use("/api/user", users);
app.use("/api/severitys", severitys);

mongoose.connect("mongodb://127.0.0.1/tasks");

const exp = require("constants");

var myHeaders = new Headers();
myHeaders.append("Access-Control-Allow-Origin", "http://localhost:3000");

const testapplication = new TestApplication();
testapplication.on("loadApplication", (arg) => {
  fs.appendFile("logger.txt", "Application loaded!\n", (err) => {
    if (err) {
      throw err;
    } else {
      console.log(arg);
    }
  });
});
testapplication.loadApplication("Application is Loading...");

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));

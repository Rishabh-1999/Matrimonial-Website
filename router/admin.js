const express = require("express");
const app = express.Router();

// Controllers
var controllers = require('../controllers');

// Middleware
var middleware = require("../middlewares/middleware");

app.post("/managePeople", controllers.admin.managePeople);

module.exports = app;
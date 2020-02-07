const express = require("express");
var bodyParser = require("body-parser");
const app = express.Router();

// parse application/x-www-form-urlencoded
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

// parse application/json
app.use(bodyParser.json());

// Models
var Users = require("../models/users");

// Controllers
var controllers = require('../controllers');

// Middleware
var middleware = require("../middlewares/middleware");

app.get('/register', function(req,res) {
  res.render('registerUser');
})

// Controllers //

/* POST Check Login */
app.post("/checkLogin", controllers.users.checkLogin);

/* User Register Himself/Herself */
app.post("/registerUser", controllers.users.registerUser);

module.exports = app;
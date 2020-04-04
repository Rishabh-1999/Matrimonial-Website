const express = require("express");
const app = express.Router();

// Models
var Users = require("../models/users");

// Controllers
var controllers = require('../controllers');

// Middleware
var middleware = require("../middlewares/middleware");

app.get('/register', function (req, res) {
  res.render('registerUser');
})

/* POST Check Login */
app.post("/checkLogin", controllers.users.checkLogin);

/* User Register Himself/Herself */
app.post("/registerUser", controllers.users.registerUser);

/* User Register Himself/Herself */
app.post("/updateprofile", controllers.users.updateprofile);

/* logout person */
app.use("/logout_person", controllers.users.logout_person);

app.post('/getAllByPagingfunction', middleware.checkSession, controllers.users.getAllByPagingfunction);

app.post('/getLimitedByPagingfunction', middleware.checkSession, controllers.users.getLimitedByPagingfunction);

module.exports = app;
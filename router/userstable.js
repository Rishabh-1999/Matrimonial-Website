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
app.get("/logout_person", controllers.users.logout_person);

app.post('/getDataByPagingfunction', middleware.checkSession, controllers.users.getDataByPagingfunction);

app.get('/getRecommendationUser', controllers.recommendation.getRecommendationUser)

app.get("/getAllProfiles", controllers.users.getAllProfiles);

module.exports = app;
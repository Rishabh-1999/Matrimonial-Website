const express = require("express");
const app = express.Router();

/* Controllers */
var controllers = require('../../controllers');

/* Middleware */
var middleware = require("../../middlewares/middleware");

/* Register Page */
app.get('/register', function (req, res) {
    res.render('registerUser');
})

/* Home Page */
app.get("/home", middleware.checkSessionElseProfile, function (req, res) {
    res.render("home", {
        data: req.session.data
    });
});

/* Search Page */
app.get("/searchpage", middleware.checkSessionElseProfile, function (req, res) {
    res.render("searchpage", {
        data: req.session.data
    });
});

/* Edit Profile Page */
app.get("/editprofile", controllers.users.editprofile);


/* Check Login Data */
app.post("/checkLogin", controllers.users.checkLogin);

/* User Register Data */
app.post("/registerUser", controllers.users.registerUser);

/* User Register Data */
app.post("/updateprofile", controllers.users.updateprofile);

/* Logout */
app.get("/logout", controllers.users.logout_person);

app.post('/getDataByPagingfunction', middleware.checkSessionElseProfile, controllers.users.getDataByPagingfunction);

app.get('/getRecommendationUser', middleware.checkSessionElseProfile, controllers.recommendation.getRecommendationUser)

app.get("/:id", middleware.checkSessionElseProfile, controllers.users.getparticularuser);

module.exports = app;
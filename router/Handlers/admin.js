const express = require("express");
const app = express.Router();

/* Controllers */
var controllers = require('../../controllers');

/* Middleware */
var middleware = require("../../middlewares/middleware");

/* Manage People Page  */
app.get("/manage_people", middleware.checkSessionElseProfile, function (req, res) {
    res.render("manage_people", {
        data: req.session.data
    });
});

/* Manage People Table Data  */
app.post("/managePeople", controllers.users.managePeople);

module.exports = app;
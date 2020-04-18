const express = require("express");
var session = require("express-session");
var mongoStore = require("connect-mongo")(session);
var bodyParser = require("body-parser");
var path = require("path");
var favicon = require("serve-favicon");
var mongoose = require("mongoose");
var engine = require("ejs-mate");
var morgan = require("morgan");

require("dotenv").config();

var app = express();
var http = require("http");
var server = http.Server(app);
var PORT = process.env.PORT || 3000;

/* DB */
require("./config/db");

app.use(morgan("dev"));

var db = mongoose.connection;

/* Session */
app.use(
    session({
        secret: "abcUCAChitkara",
        resave: true,
        saveUninitialized: true,
        store: new mongoStore({
            mongooseConnection: db
        })
    })
);

// app.use(favicon(path.join(__dirname, "public//img/", "logo.ico")));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* Models */
var Users = require("./models/users");

/* Routing Implementation */
app.use("/userTable", require("./router/userstable"));

/* Middleware */
var middleware = require("./middlewares/middleware");

app.get("/", function (req, res) {
    res.render("login");
});

app.get("/home", middleware.checkSession, function (req, res) {
    res.render("home", {
        data: req.session.data
    });
});

app.get("/peronaldetails", middleware.checkSession, function (req, res) {
    Users.findOne({
        _id: req.session._id
    }).populate("personaldetails").exec(function (err, result) {
        if (err)
            console.log(err);
    });
});

app.get("/searchpage", middleware.checkSession, function (req, res) {
    res.render("searchpage", {
        data: req.session.data
    });
});

app.get("/adddetails", middleware.checkSession, function (req, res) {
    res.render("adddetails", {
        data: req.session.data
    });
});

app.get("/editprofile", async function (req, res) {
    await Users.findOne({
        _id: req.session._id
    }).populate("personaldetails").then((result, err) => {
        if (err)
            console.log(err)
        res.render("editprofile", {
            data: result
        });
    })
});

server.listen(PORT, () => {
    console.log("Running on port: " + PORT);
});
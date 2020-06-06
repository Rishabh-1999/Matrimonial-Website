const express = require("express");
var session = require("express-session");
var mongoStore = require("connect-mongo")(session);
var bodyParser = require("body-parser");
var path = require("path");
var favicon = require("serve-favicon");
var mongoose = require("mongoose");
var engine = require("ejs-mate");
var morgan = require("morgan");

var app = express();
var http = require("http");
var server = http.Server(app);
var PORT = process.env.PORT || 3000;

/* ENV */
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

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
app.use("/", require("./router/"));

/* Middleware */
var middleware = require("./middlewares/middleware");

/* Index Page */
app.get("/", function (req, res) {
    res.render("index");
});

// /* Add Details Page */
// app.get("/adddetails", middleware.checkSessionElseProfile, function (req, res) {
//     res.render("adddetails", {
//         data: req.session.data
//     });
// });

server.listen(PORT, () => {
    console.log("Running on port: " + PORT);
});
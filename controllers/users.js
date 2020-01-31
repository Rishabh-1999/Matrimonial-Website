var Users = require("../models/users");
var bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports.register = async function (req, res) {};

module.exports.checkLogin = async function (req, res) {
    console.log(req.body);
    Users.findOne({
                email: req.body.email
            },
            function (err, result) {
                console.log("yes");
                if (result) {
                    bcrypt.compare(req.body.password, result.password, function (
                        err,
                        password
                    ) {
                        if (password) {
                            req.session.isLogin = 1;
                            req.session._id = result._id;
                            req.session.firstname = result.firstname;

                            var ob = new Object();
                            ob.firstname = result.firstname;
                            ob._id = result._id;
                            ob.email = result.email;
                            ob.gender = result.gender;
                            ob.city = result.city;
                            ob.DOB = result.DOB;
                            ob.phoneno = result.phoneno;
                            ob.type = result.type;
                            req.session.name = result.name;
                            req.session.data = ob;
                            console.log("-------------------Logined--------------------");
                            if (req.session.data.type == "User") {
                                if (result.type == false)
                                    res.send("not");
                                else
                                    res.send("Logined");
                            } else if (req.session.data.type == "Admin")
                                res.redirect("/adminpage");
                        } else {
                            return res.redirect("/");
                        }
                    });
                } else {
                    return res.redirect("/");
                }
            }
        )
        .select("+password")
        .catch(err => {
            res.send(error);
        });
};
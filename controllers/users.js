var Users = require("../models/users");
var Personal = require("../models/personaldetails");

module.exports.checkLogin = async function (req, res) {
    Users.findOne({
                email: req.body.email,
                password: req.body.password
            },
            function (err, result) {
                if (result) {
                    req.session.isLogin = 1;
                    req.session._id = result._id;
                    req.session.firstname = result.firstname;

                    var ob = new Object();
                    ob.firstname = result.firstname;
                    ob._id = result._id;
                    ob.email = result.email;
                    ob.gender = result.gender;
                    ob.photourl = result.photourl;
                    ob.DOB = result.DOB;
                    ob.type = result.type;
                    req.session.data = ob;
                    res.send("Logined");
                }
            }
        )
        .select("+password")
        .catch(err => {
            res.send(error);
        });
};

exports.registerUser = async function (req, res) {
    let personaldetails = new Personal({
        middlename: "",
        lastname: req.body.lastname,
        religion: "-",
        mothertougne: "-",
        phoneno: "-",
        education: "-",
        height: "-",
        weight: "-",
        isDoingJob: false
    });
    personaldetails
        .save()
        .then(data => {
            let u = new Users({
                firstname: req.body.firstname,
                email: req.body.email,
                type: "User",
                gender: req.body.gender,
                password: req.body.password,
                DOB: "",
                photourl: "",
                isVerfied: false,
                isActive: false,
                personaldetails: data._id
            });
            u.save()
                .then(data => {
                    console.log("New User created");
                })
                .catch(err => {
                    console.log(err)
                });
        })
        .catch(err => {
            console.log(err)
        });
    res.send("data saved");
};

exports.logout_person = (req,res) => {
    req.session.isLogin = 0;
    req.session.destroy();
    res.render('login');
}
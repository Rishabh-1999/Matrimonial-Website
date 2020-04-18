/* Models */
var Users = require("../models/users");
var Personal = require("../models/personaldetails");
var recommendation = require("../models/recommendation");

/* Utils */
var {
    getAge
} = require("../config/utils")

const {
    updateEducation,
    updateReligion,
    updateMinAndMaxAge,
    Recommendation,
} = require("../models/recommendation");

module.exports.checkLogin = async function (req, res) {
    Users.findOne({
                email: req.body.email,
                password: req.body.password,
            },
            function (err, result) {

                if (err)
                    new Error("Error while LoginIn");

                if (result) {
                    req.session.isLogin = 1;
                    req.session._id = result._id;
                    req.session.isVerfied = result.isVerfied;

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
                } else {
                    res.send("NoData");
                }
            }
        )
        .select("+password")
        .catch((err) => {
            res.send(error);
        });
};

exports.registerUser = async function (req, res) {

    let user_obj = await new Users({
        firstname: req.body.firstname,
        email: req.body.email,
        type: "User",
        gender: req.body.gender,
        password: req.body.password,
        isVerfied: false,
        isActive: false
    });
    await user_obj.save()
        .then(async data_user => {
            let cal_age = await getAge(req.body.dob);

            let personaldetails_obj = new Personal({
                lastname: req.body.lastname,
                DOB: req.body.dob,
                age: parseInt(cal_age),
                isDoingJob: false,
                user: data_user._id
            });
            personaldetails_obj
                .save()
                .then(async data_personaldetails => {
                    data_user.personaldetails = data_personaldetails._id;
                    let recommendation_obj = new Recommendation({
                        religion: [],
                        education: [],
                        user: data_user._id,
                        minage: cal_age - 5,
                        maxage: cal_age + 1
                    })
                    recommendation_obj.save().then(data_rec => {
                        data_user.recommendationdetails = data_rec._id;
                        data_user.save()
                        res.redirect("1");
                    }).catch(err => {
                        console.log(err)
                    });
                })
        })
        .catch(err => {
            console.log(err)
        });

    //   let personaldetails = new Personal({
    //     middlename: "",
    //     lastname: req.body.lastname,
    //     religion: "-",
    //     mothertougne: "-",
    //     phoneno: "-",
    //     education: "-",
    //     height: "-",
    //     weight: "-",
    //     isDoingJob: false,
    //   });
    //   personaldetails
    //     .save()
    //     .then((data) => {
    //       let u = new Users({
    //         firstname: req.body.firstname,
    //         email: req.body.email,
    //         type: "User",
    //         gender: req.body.gender,
    //         password: req.body.password,
    //         DOB: "",
    //         photourl: "",
    //         isVerfied: false,
    //         isActive: false,
    //         personaldetails: data._id,
    //       });
    //       u.save()
    //         .then((data1) => {
    //           console.log("New User created");
    //         })
    //         .catch((err) => {
    //           //await CreateRecommendation(data,data1);
    //           console.log(err);
    //         });
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    //   res.send("data saved");
};

exports.getDataByPagingfunction = async function (req, res, next) {
    let query = {};

    if (req.body.religion) {
        query["religion"] = req.body.religion;
        await updateReligion(req, req.body.religion);
    }
    if (req.body.minage && req.body.maxage) {
        query["age"] = {
            $gt: parseInt(req.body.minage),
            $lt: parseInt(req.body.maxage),
        };
        await updateMinAndMaxAge(req, req.body.minage, req.body.maxage);
    }
    if (req.body.education) {
        query["education"] = req.body.education;
        await updateEducation(req, req.body.education);
    }
    var query1 = {};
    if (req.body.searchinput) {
        query1["firstname"] = {
            $regex: req.body.searchinput,
        };
    }
    query1["gender"] = req.session.gender == "Male" ? "Male" : "Female";

    Personal.find(query)
        .populate({
            path: "user",
            model: "users",
            match: query1,
        })
        .exec(function (error, result) {
            if (error) console.log(error);

            result = result.filter(function (r) {
                return r.user != null;
            });
            result = result.splice(req.body.start, req.body.start + req.body.end)
            res.send(result);
        });
};

exports.logout_person = (req, res) => {
    req.session.isLogin = 0;
    req.session.destroy();
    res.render("login");
};

exports.updateprofile = (req, res) => {
    if (
        req.body.firstname != null &&
        req.body.email != null &&
        req.body.gender != null &&
        req.body.photourl != null &&
        req.body.middlename != null &&
        req.body.lastname &&
        req.body.religion != null &&
        req.body.DOB != null &&
        req.body.mothertongue != null &&
        req.body.phoneno != null &&
        req.body.weight != null &&
        req.body.height != null &&
        req.body.address1 != null &&
        req.body.city != null &&
        req.body.state != null &&
        req.body.isDoingJob != null
    ) {
        var user_obj = new Object();
        user_obj.firstname = req.body.firstname;
        user_obj.email = req.body.email;
        user_obj.gender = req.body.gender;
        user_obj.photourl = req.body.photourl;
        user_obj.isVerfied = true;

        Users.updateOne({
                    _id: req.session._id,
                },
                user_obj
            )
            .then((result) => {
                var personaldetails_obj = new Object();
                personaldetails_obj.middlename = req.body.middlename;
                personaldetails_obj.lastname = req.body.lastname;
                personaldetails_obj.religion = req.body.religion;
                personaldetails_obj.DOB = req.body.DOB;
                personaldetails_obj.mothertongue = req.body.mothertongue;
                personaldetails_obj.phoneno = req.body.phoneno;
                // education: {
                //     type: String,
                //     trim: true
                // },
                personaldetails_obj.height = req.body.height;
                personaldetails_obj.weight = req.body.weight;
                personaldetails_obj.address1 = req.body.address1;
                personaldetails_obj.city = req.body.city;
                personaldetails_obj.state = req.body.state;
                personaldetails_obj.isDoingJob = req.body.isDoingJob;

                Personal.updateOne({
                            _id: result.personaldetails,
                        },
                        personaldetails_obj
                    )
                    .then((result1) => {
                        req.session.isVerfied = true;
                        res.send("1");
                    })
                    .catch((err) => {
                        console.log(err);
                        res.send("0");
                    });
            })
            .catch((err) => {
                console.log(err);
                res.send("0");
            });
        res.send("0");
    }
};

exports.getAllProfiles = (req, res) => {
    if (req.session.data.gender == "Male") {
        var data = "Female";
    } else {
        var data = "Male";
    }
    Users.find({
            gender: data,
        },
        function (error, result) {
            if (error) throw error;
            else res.send(JSON.stringify(result));
        }
    );
};
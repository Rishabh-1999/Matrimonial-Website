/* Models */
var Users = require("../models/users");
var Personal = require("../models/personaldetails");
var recommendation = require("../models/recommendation");

/* Utils */
var {
  getAge
} = require("../config/utils");

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
    })
    .select("+password")
    .then((result) => {
      if (result != null) {
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
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

exports.registerUser = async function (req, res) {
  Users.create({
      firstname: req.body.firstname,
      email: req.body.email,
      type: "User",
      gender: req.body.gender,
      password: req.body.password,
    })
    .then(async (data_user) => {
      var cal_age = await getAge(req.body.dob);

      Personal.create({
          lastname: req.body.lastname,
          DOB: req.body.dob,
          age: parseInt(cal_age),
          isDoingJob: false,
          user: data_user._id,
        })
        .then(async (data_personaldetails) => {
          data_user.personaldetails = data_personaldetails._id;

          Recommendation.create({
              religion: [],
              education: [],
              user: data_user._id,
              minage: cal_age - 5,
              maxage: cal_age + 1,
            })
            .then((data_rec) => {
              data_user.recommendationdetails = data_rec._id;
              data_user.save();

              res.send("done");
            })
            .catch((err) => {
              console.log(err);
              throw err;
            });
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

exports.getDataByPagingfunction = async function (req, res) {
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
      result = result.splice(req.body.start, req.body.start + req.body.end);
      res.send(result);
    });
};

exports.logout_person = (req, res) => {
  req.session.isLogin = 0;
  req.session.destroy();
  res.render("index");
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
            res.send("201");
          })
          .catch((err) => {
            console.log(err);
            res.send("404");
          });
      })
      .catch((err) => {
        console.log(err);
        res.send("404");
      });
  } else {
    res.send("404");
  }
};

exports.editprofile = (req, res) => {
  Users.findOne({
      _id: req.session._id,
    })
    .populate("personaldetails")
    .then((result) => {
      res.render("editprofile", {
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

module.exports.managePeople = async function (req, res) {
  let query = {};
  let params = {};

  if (req.body.search.value) {
    query["$or"] = [{
      "email": {
        '$regex': req.body.search.value,
        '$options': 'i'
      },
      "firstname": {
        '$regex': req.body.search.value,
        '$options': 'i'
      }
    }]
  }

  let sortingType;
  if (req.body.order[0].dir === 'asc')
    sortingType = 1;
  else
    sortingType = -1;

  if (req.body.order[0].column === '0')
    params = {
      skip: parseInt(req.body.start),
      limit: parseInt(req.body.length),
      sort: {
        email: sortingType
      }
    };

  Users.find(query, {}, params).then((data) => {
    Users.countDocuments(query).then((filteredCount) => {
      Users.countDocuments(function (err, totalCount) {
        if (err) {
          console.log(err)
          throw err;
        } else
          res.send({
            "recordsTotal": totalCount,
            "recordsFiltered": filteredCount,
            data
          });
      })
    }).catch((err) => {
      console.log(err)
      throw err;
    });
  }).catch((err) => {
    console.log(err)
    throw err;
  })
}

module.exports.getparticularuser = async (req, res) => {
  var parmas_id = req.params.id;
  Users.findOne({
      _id: parmas_id
    }).populate("personaldetails")
    .then(async (result) => {
      console.log(result)
      if (result.personaldetails != null && result.personaldetails.religion != null && result.personaldetails.religion != "" && result.personaldetails.religion != '-') {
        await updateReligion(req, result.personaldetails.religion);
      }
      if (result.personaldetails.education != null && result.personaldetails.education != "" && result.personaldetails.education != '-') {
        await updateEducation(req, result.personaldetails.education);
      }
      res.render("user", {
        data: req.session.data,
        editprofile: result,
      });
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
}
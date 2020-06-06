/* Models */
var {
    Recommendation
} = require("../models/recommendation");
var Users = require("../models/users");

exports.getRecommendationUser = async function (req, res) {
    var respond_data = new Object();

    await Recommendation.findOne({
        user: req.session._id
    }).then((result) => {

        respond_data.minage = result.minage;
        respond_data.maxage = result.maxage;

        respond_data.religion = (result.religion.reduce(function (prev, current) {
            return (prev.count > current.count) ? prev : current
        })).name;

        respond_data.education = (result.education.reduce(function (prev, current) {
            return (prev.count > current.count) ? prev : current
        })).name;

        let query = {};

        if (respond_data.religion) {
            query["religion"] = respond_data.religion;
        }
        if (respond_data.minage && respond_data.maxage) {
            query["age"] = {
                $gt: parseInt(respond_data.minage),
                $lt: parseInt(respond_data.maxage)
            };
        }
        if (respond_data.education) {
            query["education"] = respond_data.education;
        }

        let query1 = {}
        query1["gender"] = req.session.gender == "Male" ? "Male" : "Female";

        Users.find(query1).populate({
            path: "personaldetails",
            model: "personaldetails",
            match: query
        }).then((result1) => {
            result1 = result1.filter(function (r) {
                return r.personaldetails != null;
            })
            res.send(result1);
        }).catch((err) => {
            console.log(err);
            throw err;
        })
    }).catch((err) => {
        console.log(err);
        throw err;
    })
}
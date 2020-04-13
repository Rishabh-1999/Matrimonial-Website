/* Models */
var {
    Recommendation
} = require("../models/recommendation");
var Users = require("../models/users");

async function getRecommendation(id) {
    var respond_data = new Object();
    await Recommendation.findOne({
        user: id
    }, async function (err, result) {

        respond_data.minage = result.minage;
        respond_data.maxage = result.maxage;

        respond_data.religion = (result.religion.reduce(function (prev, current) {
            return (prev.count > current.count) ? prev : current
        })).name;

        respond_data.education = (result.education.reduce(function (prev, current) {
            return (prev.count > current.count) ? prev : current
        })).name;

        if (err)
            console.log(err)
        else {
            //  console.log(respond_data)
        }
    })
    return respond_data;
}

exports.getRecommendationUser = async function (req, res) {

    var recommendation_data = await getRecommendation(req.session._id);
    console.log(recommendation_data)

    let query = {};

    if (recommendation_data.religion) {
        query["religion"] = recommendation_data.religion;
    }
    if (recommendation_data.minage && recommendation_data.maxage) {
        query["age"] = {
            $gt: parseInt(recommendation_data.minage),
            $lt: parseInt(recommendation_data.maxage)
        };
    }
    if (recommendation_data.education) {
        query["education"] = recommendation_data.education;
    }
    let query1 = {}
    query1["gender"] = req.session.gender == "Male" ? "Male" : "Female";

    Users.find(query1).populate({
        path: "personaldetails",
        model: "personaldetails",
        match: query
    }).exec(function (error, result) {
        if (error)
            console.log(error)

        result = result.filter(function (r) {
            return r.personaldetails != null;
        })
        //        console.log(result)
        res.send(result);
    })
}
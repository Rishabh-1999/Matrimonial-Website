var mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectID;

/* Models */

var recommendationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId
  },
  religion: [{
    name: {
      type: String,
    },
    count: {
      type: Number
    }
  }],
  minage: {
    type: Number
  },
  maxage: {
    type: Number
  },
  education: [{
    name: {
      type: String,
    },
    count: {
      type: Number
    }
  }],
  height: {
    type: String,
    trim: true,
  },
  weight: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  isDoingJob: [{
    type: Boolean,
  }],
});

var Recommendation = mongoose.model("recommendations", recommendationSchema);

async function updateReligion(req, religiond) {
  Recommendation.updateOne({
    user: req.session._id,
    religion: {
      $elemMatch: {
        name: religiond
      }
    }
  }, {
    $inc: {
      "religion.$.count": 1
    },
  }, async function (err, result) {
    // console.log("result")
    //console.log(result)
    if (result.n == 0) {
      await Recommendation.updateOne({
        user: req.session._id,
      }, {
        $push: {
          religion: {
            "name": religiond,
            "count": 1
          }
        }
      })
    }
  });
}

async function updateEducation(req, education_data) {
  //console.log(education_data)
  Recommendation.updateOne({
    user: req.session._id,
    education: {
      $elemMatch: {
        name: education_data
      }
    }
  }, {
    $inc: {
      "education.$.count": 1
    },
  }, async function (err, result) {
    //console.log(result)
    if (result.n == 0) {
      await Recommendation.updateOne({
        user: req.session._id,
      }, {
        $push: {
          education: {
            "name": education_data,
            "count": 1
          }
        }
      })
    }
  });
}

async function updateMinAndMaxAge(req, minage_data, maxage_data) {
  Recommendation.findOne({
    user: req.session._id
  }, function (err, result) {
    if (err)
      console.log(err)

    result.minage = Math.ceil((result.minage + Number(minage_data)) / 2);
    result.maxage = Math.ceil((result.maxage + Number(maxage_data)) / 2);

    result.save();

  })
}

module.exports.Recommendation = Recommendation;
module.exports.updateReligion = updateReligion;
module.exports.updateMinAndMaxAge = updateMinAndMaxAge;
module.exports.updateEducation = updateEducation;
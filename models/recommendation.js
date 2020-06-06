/* Models */
var mongoose = require("mongoose");

var recommendationSchema = new mongoose.Schema({
  user: {
    'type': mongoose.Schema.Types.ObjectId,
    'ref': "users",
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
    type: Number,
    required: true
  },
  maxage: {
    type: Number,
    required: true
  },
  education: [{
    name: {
      type: String,
    },
    count: {
      type: Number
    }
  }],
});

var Recommendation = mongoose.model("recommendations", recommendationSchema);
module.exports.Recommendation = Recommendation;

module.exports.updateReligion = async (req, religion_data) => {
  Recommendation.updateOne({
    user: req.session._id,
    religion: {
      $elemMatch: {
        name: religion_data
      }
    }
  }, {
    $inc: {
      "religion.$.count": 1
    },
  }).then(async (result) => {
    if (result.n == 0) {
      await Recommendation.updateOne({
        user: req.session._id,
      }, {
        $push: {
          religion: {
            "name": religion_data,
            "count": 1
          }
        }
      })
    }
  }).catch((err) => {
    console.log(err)
    throw err;
  });
}

module.exports.updateEducation = async (req, education_data) => {
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
  }).then(async (result) => {
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
  }).catch((err) => {
    console.log(err)
    throw err
  });
}

module.exports.updateMinAndMaxAge = async (req, minage_data, maxage_data) => {
  Recommendation.findOne({
    user: req.session._id
  }).then((result) => {
    result.minage = Math.ceil((result.minage + Number(minage_data)) / 2);
    result.maxage = Math.ceil((result.maxage + Number(maxage_data)) / 2);
    result.save();
  }).catch((err) => {
    console.log(err);
    throw err
  })
}
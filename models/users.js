var mongoose = require("mongoose");

/* Models */
var Personal = require("./personaldetails");
var {
    Recommendation
} = require("./recommendation");

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var loginSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    photourl: {
        type: String,
        trim: true,
        default: ""
    },
    personaldetails: {
        'type': mongoose.Schema.Types.ObjectId,
        'ref': Personal,
    },
    recommendationdetails: {
        'type': mongoose.Schema.Types.ObjectId,
        'ref': Recommendation,
    },
    type: {
        type: String,
        required: true
    },
    isVerfied: {
        type: Boolean,
        default: false,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true
    },
});

var logins = mongoose.model("users", loginSchema);
module.exports = logins;
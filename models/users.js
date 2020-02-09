var mongoose = require("mongoose");

var Personal = require("./personaldetails");

const GENDERS = ["Male", "Female"];

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
        enum: ["Male", "Female"],
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    photourl: {
        type: String,
        trim: true
    },
    personaldetails: {
        'type': mongoose.Schema.Types.ObjectId,
        'ref': Personal,
    },
    type: {
        type: String,
    },
    isVerifed: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
});

var logins = mongoose.model("users", loginSchema);
module.exports = logins;
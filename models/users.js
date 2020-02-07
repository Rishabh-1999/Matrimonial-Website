var mongoose = require("mongoose");

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var loginSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    middlename: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    religion: {
        type: String,
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
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    DOB: {
        type: String,
    },
    mothertongue: {
        type: String,
        trim: true
    },
    phoneno: {
        type: String,
        trim: true
    },
    photourl: {
        type: String,
        trim: true
    },
    education: {
        type: String,
        trim: true
    },
    height: {
        type: String,
        trim: true
    },
    weight: {
        type: String,
        trim: true
    },
    type: {
        type: String,
    },
    address1: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    state: {
        type: String,
        trim: true
    },
    isVerifed: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    isDoingJob: {
        type: Boolean,
    },
});

var logins = mongoose.model("users", loginSchema);
module.exports = logins;
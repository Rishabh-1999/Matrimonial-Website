var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var personaldetailsSchema = new mongoose.Schema({
    middlename: {
        type: String,
        trim: true,
        default: ""
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
    DOB: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    mothertongue: {
        type: String,
        trim: true,
        default: ""
    },
    phoneno: {
        type: String,
        trim: true,
        default: ""
    },
    education: {
        type: String,
        trim: true,
        default: ""
    },
    height: {
        type: String,
        trim: true,
        default: ""
    },
    weight: {
        type: String,
        trim: true,
        default: ""
    },
    address1: {
        type: String,
        trim: true,
        default: ""
    },
    city: {
        type: String,
        trim: true,
        default: ""
    },
    state: {
        type: String,
        trim: true,
        default: ""
    },
    isDoingJob: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        'type': mongoose.Schema.Types.ObjectId,
        'ref': "users",
    },
});

var details = mongoose.model("personaldetails", personaldetailsSchema);
module.exports = details;
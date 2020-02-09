var mongoose = require("mongoose");

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var personaldetailsSchema = new mongoose.Schema({
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
    isDoingJob: {
        type: Boolean,
    },
});

var details = mongoose.model("personaldetails", personaldetailsSchema);
module.exports = details;
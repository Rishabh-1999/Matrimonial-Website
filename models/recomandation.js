var mongoose = require("mongoose");

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var personaldetailsSchema = new mongoose.Schema({
    religion: {
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
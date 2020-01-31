const mongoose = require("mongoose");
var mongoDB = process.env.DB_MONGO;
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.set("useCreateIndex", true);

mongoose.connect(
  mongoDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (!err) {
      console.log("Database connected");
    } else {
      console.log("Error: " + err);
    }
  }
);

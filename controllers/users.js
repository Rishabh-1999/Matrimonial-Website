var Users = require("../models/users");
const saltRounds = 10;

module.exports.checkLogin = async function (req, res) {
    Users.find({
                email: req.body.email,
                password : req.body.password
            },
            function (err, result) {
                console.log(result)
                if (result) {
                    
                            req.session.isLogin = 1;
                            req.session._id = result._id;
                            req.session.firstname = result.firstname;

                            var ob = new Object();
                            ob.firstname = result.firstname;
                            ob._id = result._id;
                            ob.email = result.email;
                            ob.gender = result.gender;
                            ob.city = result.city;
                            ob.DOB = result.DOB;
                            ob.phoneno = result.phoneno;
                            ob.type = result.type;
                            req.session.name = result.name;
                            req.session.data = ob;
                            
                                res.send("Logined");
            }
        })
        .select("+password")
        .catch(err => {
            res.send(error);
        });
};

exports.registerUser = async function (req, res) {
      Users.create(req.body,function(error,result)
      {
        if(error)
        throw error;
        else{}
      })
      res.send("data saved");         
  } 
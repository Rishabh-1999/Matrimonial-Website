
var Users = require("../models/users");

module.exports.managePeople = async function (req, res) {
    let query = {};
    let params = {};


    if(req.body.search.value)
    {
        query["$or"]= [{
            "email":  { '$regex' : req.body.search.value, '$options' : 'i' }
        }]
    }
    let sortingType;
    if(req.body.order[0].dir === 'asc')
        sortingType = 1;
    else
        sortingType = -1;

    if(req.body.order[0].column === '0')
        params = {skip : parseInt(req.body.start) , limit : parseInt(req.body.length), sort : {email : sortingType}};
   
        Users.find(query , {} , params , function (err , data)
        {
            if(err)
                console.log(err);
            else
            {
                Users.countDocuments(query, function(err , filteredCount)
                {
                    if(err)
                        console.log(err);
                    else
                    {
                        Users.countDocuments(function (err, totalCount)
                        {
                            if(err)
                                console.log(err);
                            else
                                res.send({"recordsTotal": totalCount,
                                    "recordsFiltered": filteredCount, data});
                        })
                    }
                });
            }
        })
}
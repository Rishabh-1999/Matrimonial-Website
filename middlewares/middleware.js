function checkSessionElseProfile(req, res, next) {
    if (req.session.isLogin) {
        if (req.session.isVerfied == true)
            next();
        else
            res.redirect("/user/editprofile")
    } else res.redirect("/");
}

function checkAdmin(req, res, next) {
    if (req.session.data.role == "Admin") next();
    else res.redirect("/");
}

// Exporting all the modules
module.exports.checkSessionElseProfile = checkSessionElseProfile;
module.exports.checkSessionElseProfile = checkSessionElseProfile;
module.exports.checkAdmin = checkAdmin;
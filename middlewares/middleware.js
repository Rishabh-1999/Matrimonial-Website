function isAllowed(req, res, next) {
    if (req.session.isLogin)
        next();
    else
        res.redirect("/");
}

function checkSession(req, res, next) {
    if (req.session.isLogin) {
        if (req.session.isVerfied == true)
            next();
        else
            res.redirect("/editprofile")
    } else res.redirect("/");
}

function checkAdmin(req, res, next) {
    if (req.session.data.role == "Admin") next();
    else res.redirect("/");
}

// Exporting all the modules
module.exports.isAllowed = isAllowed;
module.exports.checkSession = checkSession;
module.exports.checkAdmin = checkAdmin;
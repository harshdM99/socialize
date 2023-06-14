module.exports.profile = function(req, res){
    // res.end("<h1> I am a user profile! </h1>");
    return res.render("user", {
        title: "User",
    });
}

module.exports.signUp = function(req, res){
    return res.render("user_sign_up", {
        title: "Socialize | Sign Up"
    });
}

module.exports.signIn = function(req, res){
    return res.render("user_sign_in", {
        title: "Socialize | Sign In"
    });
}
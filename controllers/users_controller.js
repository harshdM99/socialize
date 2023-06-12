module.exports.profile = function(req, res){
    // res.end("<h1> I am a user profile! </h1>");
    return res.render("user", {
        title: "User",
    });
}
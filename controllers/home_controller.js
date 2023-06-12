module.exports.home = function(req, res){
    // res.end("<h1> Express js is running for codeial! </h1>");
    return res.render("home", {
        title: "Home",
    });
}
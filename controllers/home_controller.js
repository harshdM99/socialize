module.exports.home = function(req, res){
    // res.end("<h1> Express js is running for codeial! </h1>");
    
    // console.log(req.cookies);
    // update a cookie
    // res.cookie("user_id", 25);
    return res.render("home", {
        title: "Home",
    });
}
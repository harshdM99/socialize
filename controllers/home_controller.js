module.exports.home = function(req, res){
    // console.log(req.cookies);
    // update a cookie
    // res.cookie("user_id", 25);
    if(req.isAuthenticated()){
        return res.render("home", {
            title: "Home",
        });
    }
    
    return res.redirect("/users/sign-in/");    
}
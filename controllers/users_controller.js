const User = require("../models/user");

module.exports.profile = function(req, res){
    // res.end("<h1> I am a user profile! </h1>");
    return res.render("user_profile", {
        title: "User",
    });
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.render("/users/profile/");
    }
    
    return res.render("user_sign_up", {
        title: "Socialize | Sign Up"
    });
}

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.render("/users/profile/");
    }

    return res.render("user_sign_in", {
        title: "Socialize | Sign In"
    });
}

// get the sign up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_pswd){
        console.log(`${req.body.password} != ${req.body.confirm_pswd}`);
        return res.redirect("back");
    }

    User.findOne({email: req.body.email}).then((user)=>{
        // return res.render("back");
        if(!user){
            User.create(req.body).then((addedUser)=>{
                console.log("User added successfully : " ,addedUser);
                return res.redirect("sign-in");
            }).catch((err)=>{
                console.log(err);
                return res.redirect("back");
            });
        } else {
            console.log(`User already exists`);
            console.log(`${user}`);  
            return res.redirect("back");
        }
    }).catch(err => console.log(err));

}

// sign in and create a session for the user
module.exports.createSession = function(req, res) {
    return res.redirect("/users/profile");
}
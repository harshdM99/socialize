const User = require("../models/user");

module.exports.profile = async function(req, res){
    // res.end("<h1> I am a user profile! </h1>");
    // Show different user profile pages
    const reqUser = await User.findById(req.params.id);

    return res.render("user_profile", {
        title: "User Profile",
        profile_user: reqUser
    });
}

module.exports.update = async function(req, res) {
    if(req.user.id == req.params.id) {
        await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email
        });
        return res.redirect("back");
    }
    return res.status(401).send("Unauthorized man!!");
}


module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect("/");
    }

    return res.render("user_sign_up", {
        title: "Socialize | Sign Up"
    });
}

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect("/");
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
    return res.redirect("/");
}

// sign out from the session
module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
    
        res.redirect('/');
    });
}
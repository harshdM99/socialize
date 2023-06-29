const Post = require("../models/post");
const User = require("../models/user");


module.exports.home = async function(req, res){
    // console.log(req.cookies);
    // update a cookie
    // res.cookie("user_id", 25);
    const posts = await Post.find({})
    .populate("user")
    .populate({
        path: "comments",
        populate: { 
            path: "user"
        }
    });

    const users = await User.find({});
    
    return res.render("home", {
        title: "Home",
        post_list: posts,
        all_users: users
    });
}
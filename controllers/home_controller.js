const Post = require("../models/post");

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
    
    return res.render("home", {
        title: "Home",
        post_list: posts
    });
}
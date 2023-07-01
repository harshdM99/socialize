const Post = require("../models/post");
const User = require("../models/user");


module.exports.home = async function(req, res){
    // console.log(req.cookies);
    // update a cookie
    // res.cookie("user_id", 25);
    try {
        const posts = await Post.find({})
        .sort("-createdAt")
        .populate("user")
        .populate({
            path: "comments",
            populate: { 
                path: "user"
            },
            options: {
                sort: { createdAt: -1} // sort the comments array in descending
            }
        })
        const users = await User.find({});
        
        return res.render("home", {
            title: "Home",
            post_list: posts,
            all_users: users
        });
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
}
const Post = require("../models/post");

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }).then((createdPost) => {
        console.log("Post added successfully : " ,createdPost);
        return res.redirect("back");
    }).catch((err) => {
        console.log(err);
        return res.redirect("back");
    });
};
const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function(req, res){
    try {
        const createdPost = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        const postAndUser = await createdPost.populate("user");
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: postAndUser
                },
                message: "Post created"
            });
        }
        
        req.flash("success", "Post published");
        return res.redirect("back");
    } catch(err) {
        req.flash("error", err);
        return res.redirect("back");
    }
};

module.exports.destroy = async function(req, res) {
    try {
        const postToDelete = await Post.findById(req.params.id);

        // .id means converting the object id into string
        if(postToDelete.user == req.user.id){
            await Post.findOneAndDelete({_id: req.params.id});
            await Comment.deleteMany({ post : req.params.id });

            if(req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                })
            }

            req.flash("success", "Post and associated comments deleted!");
        } else {
            req.flash("error", "You cannot delete this post!");
        }
        return res.redirect("back");
    } catch (err) {
        req.flash("error", err);
        return res.redirect("back");
    }
}
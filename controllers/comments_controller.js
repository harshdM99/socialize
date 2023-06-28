const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async function(req, res) {
    try {
        const post = await Post.findById(req.body.post_id);
        console.log(post);

        if(post) {
            const returnedComment = await Comment.create({
                content: req.body.content,
                post: req.body.post_id,
                user: req.user._id
            });

            // if comment is successfully created, add it to comment array in Post
            if(returnedComment){
                post.comments.push(returnedComment);
                post.save;

                return res.redirect("/");
            }
        }
    } catch (err) {
        console.error(err);
        return res.redirect("/");
    }
}
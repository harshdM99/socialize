const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async function(req, res) {
    try {
        const post = await Post.findById(req.body.post_id);
        // console.log(post);

        if(post) {
            const returnedComment = await Comment.create({
                content: req.body.content,
                post: req.body.post_id,
                user: req.user._id
            });

            // if comment is successfully created, add it to comment array in Post
            if(returnedComment){
                post.comments.push(returnedComment._id);
                await post.save();

                return res.redirect("/");
            }
        }
    } catch (err) {
        console.error(err);
        return res.redirect("/");
    }
}

module.exports.destroy = async function(req, res) {
    try {
        const commentToDelete = await Comment.findById(req.params.id);

        // TODO : I can delete comments from other users on my post as well 
        // get the user who made the post
        let userOfPost = await Post.findById(commentToDelete.post);
        userOfPost = userOfPost.user
        
        if(commentToDelete.user == req.user.id || userOfPost == req.user.id ) {
            let postId = commentToDelete.post;
            
            await Comment.findOneAndDelete({_id: req.params.id});
            await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
        }

        return res.redirect("back");
    }
    catch(err) {
        console.error(err);
        return res.redirect("back");
    }
}
const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function(req, res){
    try {
        const createdPost = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        console.log("Post added successfully : " ,createdPost);
        return res.redirect("back");
    } catch(err) {
        console.error(err);
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
        }
        return res.redirect("back");
    } catch (err) {
        console.error(err);
        return res.redirect("back");
    }
}
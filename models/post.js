const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    // for faster access, include ids of all the comments in this post schema itself
    // adding this as all comments will be shown with the posts 
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
}, {
    timestamps: true
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
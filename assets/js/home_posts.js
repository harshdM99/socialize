// method to submit form data for new post using ajax
let createPost = function () {
    let newPostForm = $("#new-post-form");
    newPostForm.on("submit", function(event) {
        event.preventDefault();
        
        $.ajax({
            type: "post",
            url: "/posts/create",
            data: newPostForm.serialize(),
            success: function(data) {
                let newPost = newPostDom(data.data.post);
                $("#post-list-container>ul").prepend(newPost);
                deletePost($(" .delete-post-button", newPost));
            }, 
            error: function(err) {
                console.log(err.responseText);
            }
        });
        newPostForm.trigger("reset");
    });
}

// method to create a post in DOM
let newPostDom = function(post) {
    return $(`<li id="post-${post._id}">
                <p>
                    <small>
                        <a class="delete-post-button" href="/posts/delete/${post._id}"> X </a>
                    </small>
                    <strong> ${post.content} </strong> <br>
                    <small> ${post.user.name} </small>
                </p>

                <div class="post-comments">
                    <form action="/comments/create" method="POST">
                        <input type="text" name="content" placeholder="Type here for comment..">
                        <input type="hidden" name="post_id" value="${ post._id }">
                        <input type="submit" value="Add Comment">
                    </form>

                    <div class="post-comments-list">
                        <ul id="post-comments-${ post._id }">
                            
                        </ul>
                    </div>
                </div>
            </li>`);
}

// method to delete a post from DOM
let deletePost = function(deleteLink) {
    $(deleteLink).click(function(event) {
        event.preventDefault();

        $.ajax({
            type: "get",
            url: $(deleteLink).prop("href"),
            success: function(data) {
                $(`#post-${data.data.post_id}`).remove();
            },
            error: function(errData) {
                console.log(errData.responseText);
            }
        });
    });
}

createPost();
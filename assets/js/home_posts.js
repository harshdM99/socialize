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
                console.log(data);
            }, 
            error: function(err) {
                console.log(err.responseText);
            }
        });
    });
}

// method to create a post in DOM


createPost();
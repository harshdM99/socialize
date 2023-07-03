// method to submit form data for new comment using ajax
let createComment = function() {
    let newCommentForm = $("#new-comment-form");
    newCommentForm.on("click", function(event) {
        event.preventDefault();

        $.ajax({
            type: "post",
            url: "/comments/create",
            data: newCommentForm.serialize(),
            success: function(data){
                let newComment = newCommentDom(data.data);
                $(`post-comments-${}`)
            },
            error: function(data){

            }
        });
    });
}

let newCommentDom = function(comment) {
    return $(`<p id="comment-${comment._id}"> 
                <small>
                    <a id="delete-comment-button" href="/comments/delete/${comment._id}"> X </a>
                </small>

                ${comment.content}
                <br> <small> ${comment.user.name} </small>
            </p>`);
}

createComment();
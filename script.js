const html = document.querySelector("html");
const submitButton = document.querySelector("#submitButton");
const userNameInput = document.querySelector("#userName");
const commentContentInput = document.querySelector("#commentContent");
const deleteButton = document.querySelectorAll(".deleteButton");
let commentNumber = 0;

function resetInput() {
    userNameInput.value = "";
    commentContentInput.value = "";
}
function createComment() {
    const userName = userNameInput.value;
    const commentContent = commentContentInput.value;
    commentNumber = commentNumber + 1;

    let comment = document.createElement("div");
    comment.className = "comment_box";

    let commentatorName = document.createElement("h3");
    let commentatorNameText = document.createTextNode(userName);
    commentatorName.appendChild(commentatorNameText);

    let commentatorComment = document.createElement("p");
    let commentatorCommentText = document.createTextNode(commentContent);
    commentatorComment.appendChild(commentatorCommentText);

    let deleteButton = document.createElement("button");
    deleteButton.className = "operation_button";
    let deleteButtonText = document.createTextNode("删除");
    deleteButton.appendChild(deleteButtonText);
    deleteButton.addEventListener("click", () => { html.removeChild(comment) });

    comment.appendChild(commentatorName);
    comment.appendChild(commentatorComment);
    comment.appendChild(deleteButton);
    html.appendChild(comment);
    resetInput();

}
submitButton.addEventListener("click", createComment);




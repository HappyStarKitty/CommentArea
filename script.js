const html=document.querySelector("html");
const commentSection = document.querySelector("#commentSection");
const submitButton = document.querySelector("#submitButton");
const userNameInput = document.querySelector("#userName");
const commentContentInput = document.querySelector("#commentContent");
const deleteButton = document.querySelectorAll(".deleteButton");
const previousPageButton=document.querySelector("#previousPage")
const nextPageButton=document.querySelector("#nextPage")

let currentPage=1;
const pageSize=10;
let commentNumber = 0;

function resetInput() {
    userNameInput.value = "";
    commentContentInput.value = "";
}

function deleteComment(event){
  const comment = event.target.parentElement;
  const commentId=comment.getAttribute("data-id");
    html.removeChild(comment);
    fetch(`http://localhost:8080/comment/delete?id=${commentId}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        }
})
        .then(response=>response.json())
        .then(data=>{
          if (data.code===0){
            console.log("Comment deleted successfully");
          }else{
            console.error("Failed to delete comment",data.msg);
          }
        }
)
        .catch(error=>{
          console.error("Error:",error);
        });}

function addComment() {
    const userName = userNameInput.value;
    const commentContent = commentContentInput.value;
    commentNumber = commentNumber + 1;

    fetch('http://localhost:8080/comment/add',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        name:userName,
        content:commentContent
      })
    })
    .then(response =>response.json())
    .then(data=>{
      if(data.code===0){
        console.log("Comment added succesfully");
        getComment(currentPage,pageSize);
      }else{
        console.error("Error adding comment:",data.msg);
      }
    })
    .catch(error=>console.error("Error:",error));

    resetInput();}
      

submitButton.addEventListener("click", addComment);

function getComment(page,size){
    fetch(`http://localhost:8080/comment/get?page=${page}&size=${size}`,{
      method:'GET'}
    )
    .then(response=>response.json())
    .then(data=>{
      if (data.code===0){
        console.log("Comments fetched successfully");
        renderComments(data.data);
        updatePaginationButtons(data.total);
      }else{
        console.error("Error fetching comments:",data.msg);
      }
    })
    .catch(error=>console.error("Error:",error));
  }

function renderComments(comments){
  commentSection.innerHTML="";
  if(Array.isArray(comments)){
  comments.forEach(comment =>{
    const commentDiv=document.createElement("div");
    commentDiv.className="comment_box";
    const commentatorName=document.createElement("h3");
    commentatorName.textContent=comment.name;
    const commentatorContent=document.createElement("p");
    commentatorContent.textContent=comment.content;
    const deleteButton=document.createElement("button");
    deleteButton.textContent="删除";
    deleteButton.addEventListener("click",deleteComment);

    commentDiv.appendChild(commentatorName);
    commentDiv.appendChild(commentatorContent);
    commentDiv.appendChild(deleteButton);
    commentSection.appendChild(commentDiv);
  });}
  else {
    console.error("Comments data is not an array");
  }
}

function deleteComment(commentID){
  fetch('http://localhost:8080/comment/delete?id=${commentID}',{
    method:'DELETE'
  })
  .then(response=>response.json())
  .then(data=>{
    if(data.code===0){
      console.log("Comment deleted successfully");
      getComment(currentPage,pageSize);
    }else{
      console.error("Error deleting comment:",data.msg);
    }
  })
  .catch(error=>console.error("Error:".error));
}


function updatePaginationButtons(totalComments){
  const totalPages=Math.ceil(totalComments/pageSize);
  previousPageButton.disabled=currentPage<=1;
  nextPageButton.disabled=currentPage>=totalPages;
}

function handlePreviousPage(){
  if (currentPage >1){
    currentPage--;
    getComment(currentPage,pageSize);
  }
}

function handleNextPage(){
  currentPage++;
  getComment(currentPage,pageSize);
}

previousPageButton.addEventListener("click",handlePreviousPage)
nextPageButton.addEventListener("click",handleNextPage);

getComment(currentPage,pageSize);


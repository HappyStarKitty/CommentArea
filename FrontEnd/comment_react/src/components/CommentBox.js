import React from 'react';

function CommentBox({ comment, onDelete }) {
  const handleDelete = () => {
    onDelete(comment.id);
  };

  return (
    <div>
    <div className="comment_box" data-id={comment.id}>
      <h3>{comment.name}</h3>
      <p>{comment.content}</p>
      <button className="delete_button" onClick={handleDelete}>删除</button>
      <br />
    </div>
    <br/>
    </div>
  );
}

export default CommentBox;

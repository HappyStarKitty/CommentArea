import React from 'react';

function CommentBox({ comment, onDelete }) {
  const handleDelete = () => {
    onDelete(comment.ID);
  };

  return (
    <div>
    <div className="comment_box" data-id={comment.ID}>
      <h3>{comment.Name}</h3>
      <p>{comment.Content}</p>
      <button className="delete_button" onClick={handleDelete}>删除</button>
      <br />
    </div>
    <br/>
    </div>
  );
}

export default CommentBox;

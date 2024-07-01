import React, { useState } from 'react';

function CommentInput({ onAddComment }) {
  const [userName, setUserName] = useState('');
  const [commentContent, setCommentContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userName && commentContent) {
      onAddComment(userName, commentContent);
      setUserName('');
      setCommentContent('');
    }
  };

  return (
    <div className="input_box">
      <h3>user name</h3>
      <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
      <br />
      <h3>comment content</h3>
      <input type="text" value={commentContent} onChange={(e) => setCommentContent(e.target.value)} />
      <br />
      <br />
      <button onClick={handleSubmit} className="submit_button">提交</button>
    </div>
  );
}

export default CommentInput;

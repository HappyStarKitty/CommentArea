// App.js
import React, { useState, useEffect } from 'react';
import CommentBox from './components/CommentBox';
import CommentInput from './components/CommentInput';
import Pagination from './components/Pagination';
import './App.css';

function App() {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalComments, setTotalComments] = useState(0);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;

  useEffect(() => {
    fetchComments(currentPage, pageSize);
  }, [currentPage]);

  const fetchComments = async (page, size) => {
    try {
      const response = await fetch(`http://localhost:8080/comment/get?page=${page}&size=${size}`);
      //console.log(response);
      const data = await response.json();
      console.log(data);
      if (data.code === 0) {
        setComments(data.data.comments || []); 
        setTotalComments(data.data.total || 0); 
        setLoading(false);
        //console.log("this step is done");
      } else {
        console.error("Error fetching comments:", data.msg);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addComment = async (name, content) => {
    try {
      const response = await fetch('http://localhost:8080/comment/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, content })
      });
      const data = await response.json();
      if (data.code === 0) {
        fetchComments(currentPage, pageSize);
      } else {
        console.error("Error adding comment:", data.msg);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteComment = async (ID) => {
    try {
      const response = await fetch(`http://localhost:8080/comment/delete/${ID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log(data);
      if (data.code === 0) {
        fetchComments(currentPage, pageSize);
      } else {
        console.error("Error deleting comment:", data.msg);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <CommentInput onAddComment={addComment} />
      {comments.length > 0 ? (
        comments.map(comment => (
          <CommentBox key={comment.ID} comment={comment} onDelete={deleteComment} />
        ))
      ) : (
        <div></div>
      )}
      <Pagination
        currentPage={currentPage}
        totalComments={totalComments}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default App;


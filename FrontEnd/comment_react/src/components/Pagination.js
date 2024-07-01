import React from 'react';

function Pagination({ currentPage, totalComments, pageSize, onPageChange }) {
  const totalPages = Math.ceil(totalComments / pageSize);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div>
      <button className="delete_button" onClick={handlePreviousPage} disabled={currentPage <= 1}>前页</button>
      <>    </>
      <button className="delete_button" onClick={handleNextPage} disabled={currentPage >= totalPages}>后页</button>
    </div>
  );
}

export default Pagination;

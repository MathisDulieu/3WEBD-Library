import React from 'react';

function Pagination({ totalPages, currentPage, onPageChange }) {
    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 mr-2"
            >
                Previous
            </button>
            <span className="px-3 py-1">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 ml-2"
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
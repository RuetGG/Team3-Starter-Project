'use client'

import React from 'react'

interface PaginationButtonProps {
  currentPage: number
  totalPages: number
  handlePageChange: (page: number) => void
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  const getPageNumbers = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
    return pages
  }

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  return (
    <div className="mt-4">
      <div className="inline-flex border border-gray-300 rounded-md overflow-hidden">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={isFirstPage}
          className={`px-3 py-1 border-r border-gray-300 text-sm ${
            isFirstPage ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'
          } rounded-l-md`}
        >
          &lt;
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 text-sm border-r border-gray-300 ${
              page === currentPage
                ? 'bg-indigo-100 border border-indigo-600 text-indigo-600'
                : 'hover:bg-gray-100 text-gray-400'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={isLastPage}
          className={`px-3 py-1 text-sm ${
            isLastPage ? 'text-gray-400 cursor-not-allowed' : 'text-gray-400 hover:bg-gray-100'
          } rounded-r-md`}
        >
          &gt;
        </button>
      </div>
    </div>
  )
}

export default PaginationButton

import React from "react";
import "./Paginated.css";
export default function Paginated({
  breedsPerPage,
  allBreeds,
  paginate,
  currentPage,
  setCurrentPage,
}) {
  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(allBreeds / breedsPerPage); i++) {
    pageNumbers.push(i + 1);
  }
  function handlePrev(e) {
    e.preventDefault();
    setCurrentPage(currentPage - 1);
  }
  function handleNext(e) {
    e.preventDefault();
    setCurrentPage(currentPage + 1);
  }

  return (
    <nav>
      <ul className="Paginated">
        <button
          className="pag"
          onClick={(e) => handlePrev(e)}
          disabled={currentPage <= 1}
        >
          {" "}
          Prev{" "}
        </button>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number} className="List_Number">
              <button
                className={
                  currentPage === number
                    ? "page_number_selected"
                    : "page_number"
                }
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            </li>
          ))}
        <button
          className="pag"
          onClick={(e) => handleNext(e)}
          disabled={currentPage >= pageNumbers.length}
        >
          {" "}
          Next        
        </button>
      </ul>
    </nav>
  );
}

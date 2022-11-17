import React from "react";
import "./Paginated.css";
export default function Paginated({
  breedsPerPage,
  allBreeds,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(allBreeds / breedsPerPage); i++) {
    pageNumbers.push(i + 1);
  }
  return (
    <nav>
      <ul className="Paginated">
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
      </ul>
    </nav>
  );
}

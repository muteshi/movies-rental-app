import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const pagination = ({
  itemsCount,
  itemsPerPage,
  onPageChange,
  pageClicked,
}) => {
  const pagesCount = Math.round(itemsCount / itemsPerPage);
  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount + 1 }, (_, i) => i + 1); //creates an array of page numbers

  const prevBtnMouseClasses =
    pageClicked === 1 ? { cursor: "not-allowed" } : { cursor: "pointer" };
  const nextBtnMouseClasses =
    pageClicked === pages.slice(-1)[0]
      ? { cursor: "not-allowed" }
      : { cursor: "pointer" };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-end">
        <li
          className={pageClicked === 1 ? "page-item disabled" : "page-item"}
          style={prevBtnMouseClasses}
        >
          <Link
            to=""
            className="page-link"
            tabIndex="-1"
            onClick={() => onPageChange(pageClicked - 1)}
          >
            Previous
          </Link>
        </li>
        {pages.map((page) => (
          <li
            className={page === pageClicked ? "page-item active" : "page-item"}
            key={page}
          >
            <Link
              to=""
              className="page-link"
              onClick={() => onPageChange(page)}
              style={{ cursor: "pointer" }}
            >
              {page}
            </Link>
          </li>
        ))}

        <li
          className={
            pageClicked === pages.slice(-1)[0]
              ? "page-item disabled"
              : "page-item"
          }
          style={nextBtnMouseClasses}
        >
          <Link
            to=""
            className="page-link"
            onClick={() => onPageChange(pageClicked + 1)}
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};

pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  pageClicked: PropTypes.number.isRequired,
};

export default pagination;

import React from "react";

const TableHeader = ({ columns, onSort, sortColumn }) => {
  const raiseSort = (path) => {
    let sortCol = { ...sortColumn };
    if (sortCol.path === path) {
      const sortOrder = sortCol.order === "asc" ? "desc" : "asc";
      sortCol.path = path;
      sortCol.order = sortOrder;
    } else {
      sortCol.path = path;
      sortCol.order = "asc";
    }
    onSort(sortCol);
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };

  const tableHeaders = columns.map((col) => (
    <th
      className="clickable"
      onClick={col.path ? () => raiseSort(col.path) : null}
      scope="col"
      key={col.label}
    >
      {col.label} {renderSortIcon(col)}
    </th>
  ));

  return (
    <thead>
      <tr>{tableHeaders}</tr>
    </thead>
  );
};

export default TableHeader;

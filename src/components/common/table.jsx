import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({ columns, onSort, sortColumn, data, onDelete, onLike }) => {
  return (
    <table className="table table-bordered ">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody
        data={data}
        onDelete={onDelete}
        onLike={onLike}
        columns={columns}
      />
    </table>
  );
};

export default Table;

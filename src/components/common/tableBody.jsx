import React from "react";
import _ from "lodash";

const TableBody = ({ data, columns }) => {
  console.log("Table body rendering");

  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };
  const tableRows = data.map((item) => {
    return (
      <tr key={item._id}>
        {columns.map((column) => (
          <td key={item._id + column.label}>{renderCell(item, column)}</td>
        ))}
      </tr>
    );
  });

  return <tbody>{tableRows}</tbody>;
};

TableBody.defaultProps = {
  rowKey: "_id",
  columnKey: "label",
};

export default React.memo(TableBody);

import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
//extracting table and call TableHeader and TableBody
const Table = ({ columns, sortColumn, onSort, data }) => {
  //distructure Argument as properties
  return (
    <table className="table">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;

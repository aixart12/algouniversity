import React, { useState } from "react";
import { classnames } from "../utils/general";

interface RowProps {
  data: {
    id: number;
    code: string;
    test_cases_passed: number;
    test_cases_failed: number;
    created_at: string;
  };
  onClick: (id: number) => void;
}

const Row: React.FC<RowProps> = ({ data, onClick }) => {
  const handleRowClick = () => onClick(data.id);
  return (
    <tr
      onClick={handleRowClick}
      className="hover:bg-gray-100 cursor-pointer text-center"
    >
      <td>{data.id}</td>
      <td>{data.code.slice(0, 15)}...</td>
      <td>{data.test_cases_passed}</td>
      <td>{data.test_cases_failed}</td>
      <td>{data.created_at}</td>
    </tr>
  );
};

interface TableProps {
  rows: {
    id: number;
    code: string;
    test_cases_passed: number;
    test_cases_failed: number;
    created_at: string;
  }[];
  onRowClick: (id: number) => void;
}

const Table: React.FC<TableProps> = ({ rows, onRowClick }) => {
  return (
    <>
      <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
        History
      </h1>
      <table
        className={classnames(
          "focus:outline-none w-full border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white mt-2 p-3",
          "overflow-auto max-h-[50px]"
        )}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Test Cases Passed</th>
            <th>Test Cases Failed</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <Row key={row.id} data={row} onClick={onRowClick} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;

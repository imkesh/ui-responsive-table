import React from "react";

// remove space from name
function enumName(name) {
  return name.replaceAll(" ", "");
}

function Table(props) {
  const { headers } = props;
  const { data } = props;

  return (
    <div className="px-0 py-2">
      <table className="table table-bordered bg-white shadow-sm rounded">
        <thead className="thead-dark bg-primary text-white">
          <tr>
            {headers.map((header) => (
              <th scope="col" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return (
              <tr>
                {headers.map((header) => (
                  <td key={header}> {row[enumName(header)]} </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

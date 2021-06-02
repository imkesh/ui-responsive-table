import React from "react";

// remove space from name
// function enumName(name) {
//   return name.replaceAll(" ", "");
// }

function Table(props) {
  const { headers } = props;
  const { data } = props;

  return (
    <div className="px-0 py-2">
      <table className="table table-bordered bg-white shadow-sm rounded">
        <thead className="thead-dark bg-primary text-white" >
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

            if(row.symbol==="HINDALCO") console.log(row["lowPrice"]);
            return (
              
              <tr 
              //   className={
              //   //row.highlight ? "highlight" : ""
              //   //row.symbol==="HINDALCO" ? "highlight" : ""
              // }
              >

                {headers.map((header) => (
                  <td className={row.symbol==="HINDALCO" && header==="highPrice" ? "highlight" : ""}
                  key={header}> {row[(header)]? row[(header)]:"NAN"} </td>
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

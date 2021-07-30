import unSeat from "../utils/unSeat";

export default function TableList({ tables }) {
  if (tables) {
    const tableList = tables.map((table) => {
      const { table_id, table_name, capacity, occupied } = table;

      const isOccupied = occupied ? "Occupied" : "Free";

      const finishButton = occupied ? ( //create button if occupied is true
        <button
          data-table-id-finish={table.table_id}
          className="btn btn-danger"
          onClick={() => unSeat(table_id)}
        >
          finish
        </button>
      ) : (
        //create empty div is occupied is false
        <div></div>
      );

      return (
        <div key={table_id} className="resList">
          <div className="name">{table_name}</div>
          <div className="deetz">Capacity: {capacity}</div>
          <div className="deetz" data-table-id-status={table_id}>
            {isOccupied}
          </div>
          <div className="buttons">{finishButton}</div>
        </div>
      );
    });

    return tableList;
  } else {
    return <div className="resList">There are no Tables listed...</div>;
  }
}

import { useHistory } from "react-router";
import unSeat from "../utils/unSeat";

export default function TableList({ tables }) {
  const history = useHistory();
  if (tables) {
    const tableList = tables.map((table) => {
      const { table_id, table_name, capacity, reservation_id } = table;

      const isOccupied = reservation_id ? "Occupied" : "Free";

      const finishButton = reservation_id ? ( //create button if occupied is true
        <button
          data-table-id-finish={table_id}
          className="btn btn-danger"
          onClick={async function () {
            await unSeat(table_id, reservation_id);
            history.push("/");
          }}
        >
          finish
        </button>
      ) : (
        //create empty div if occupied is false
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

export default function TableList({ tables }) {
  if (tables) {
    const tableList = tables.map((table) => {
      const { table_id, table_name, capacity, occupied } = table;

      const isOccupied = occupied ? "Occupied" : "Free";

      return (
        <div key={table_id} className="resList">
          <div className="name">{table_name}</div>
          <div className="deetz">Capacity: {capacity}</div>
          <div className="deetz" data-table-id-status={table_id}>
            {isOccupied}
          </div>
        </div>
      );
    });

    return tableList;
  } else {
    return <div className="resList">There are no Tables listed...</div>;
  }
}

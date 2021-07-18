import { useState } from "react";
import { useHistory, useParams } from "react-router";

export default function SeatATable({ tables, setTables }) {
  const history = useHistory();

  const [selected, setSelected] = useState(0);

  const { reservation_id } = useParams();
  console.log("reservation_id: ", reservation_id);

  const options = tables.map((table) => {
    const { table_id, table_name } = table;
    return (
      <option key={table_id} value={table_id}>
        {table_name}
      </option>
    );
  });

  function changeHandler(e) {
    e.preventDefault();
    const event = e.target;
    setSelected(event.value);
  }

  function submitHandler(e) {
    e.preventDefault();
    console.log(selected);
    const newTables = [...tables];
    newTables[selected - 1].occupied = true;
    setTables([...newTables]);
  }

  function backHandler(e) {
    e.preventDefault();
    history.goBack();
  }
  return (
    <form className="resList form" onSubmit={submitHandler}>
      <label for="selectTable">
        Seat Table for reservation {reservation_id}
        <br />
      </label>
      <select name="table_id" id="selectTable" onChange={changeHandler}>
        {options}
      </select>
      <div className="buttons">
        <button type="submit">Submit</button>
        <button onClick={backHandler}>Cancel</button>
      </div>
    </form>
  );
}

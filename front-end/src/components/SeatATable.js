import { useState } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { seatTable } from "../utils/api";

export default function SeatATable({ tables, reservations, dashboardDate }) {
  const history = useHistory();

  const [selected, setSelected] = useState(0);
  const [seatingError, setSeatingError] = useState(null);

  const { reservation_id } = useParams();
  console.log("date:", dashboardDate, "reservations:", reservations);
  const reservation = reservations.find(
    (reservation) => Number(reservation_id) === reservation.reservation_id
  ); // find info for current reservation

  const options = tables.map((table) => {
    const { table_id, table_name } = table;
    return (
      <option key={table_id} value={table_id}>
        {table_name}
      </option>
    );
  }); // create table options

  function changeHandler(e) {
    e.preventDefault();
    const event = e.target;
    console.log(event.value);
    setSelected(event.value);
  }

  function seatTheTable(details) {
    const abortController = new AbortController();
    setSeatingError(null);
    seatTable(details, abortController.signal)
      .then(console.log)
      .catch(setSeatingError);
    return () => abortController.abort();
  }

  function submitHandler(e) {
    e.preventDefault();
    const foundTable = tables.find((table) => {
      return Number(selected) === table.table_id;
    });
    console.log(tables);
    const details = {
      table_id: foundTable.table_id,
      table_capacity: foundTable.table_capacity,
      reservation_id: reservation.reservation_id,
      people: reservation.people,
    };
    seatTheTable(details);
  }

  function backHandler(e) {
    e.preventDefault();
    history.goBack();
  }
  return (
    <div>
      <ErrorAlert error={seatingError} />
      <form className="resList form" onSubmit={submitHandler}>
        <label for="selectTable">
          Seat Table for reservation {reservation_id}
          <br />
          <select name="table_id" id="selectTable" onChange={changeHandler}>
            <option value="0" selected>
              --
            </option>
            {options}
          </select>
        </label>
        <div className="buttons">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
          <button className="btn btn-danger" onClick={backHandler}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

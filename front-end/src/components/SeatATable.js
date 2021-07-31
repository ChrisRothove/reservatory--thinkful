import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { seatTable } from "../utils/api";
import loadDashboard from "../utils/loadDashboard";

export default function SeatATable({
  tables,
  dashboardDate,
  tablesError,
  setTables,
  setTablesError,
  setReservations,
  setReservationsError,
}) {
  const history = useHistory();
  const { reservation_id } = useParams();

  const [selected, setSelected] = useState(0);

  useEffect(
    () =>
      loadDashboard(
        setReservations,
        setReservationsError,
        setTablesError,
        setTables,
        dashboardDate
      ),
    [dashboardDate]
  );

  const options = tables.map((table) => {
    const { table_id, table_name, capacity } = table;
    return (
      <option key={table_id} value={table_id}>
        {table_name} - {capacity}
      </option>
    );
  }); // create table options

  function changeHandler(e) {
    e.preventDefault();
    const event = e.target;
    setSelected(event.value);
  }

  function seatTheTable() {
    const abortController = new AbortController();
    setTablesError(null);
    seatTable(reservation_id, selected, abortController.signal)
      .then((response) => {
        if (!response.message) {
          history.push("/");
        }
      })
      .catch(setTablesError);
    return () => abortController.abort();
  }

  function submitHandler(e) {
    e.preventDefault();
    if (selected === 0) {
      setTablesError({ message: "Please select a table." });
    } else {
      seatTheTable();
    }
  }

  function backHandler(e) {
    e.preventDefault();
    history.push("/");
  }
  return (
    <main>
      <div className="headerBar">
        <h1>Reservation Seating</h1>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">Seat this Reservation below</h4>
        </div>
      </div>
      <ErrorAlert error={tablesError} />
      <form className="resList form" onSubmit={submitHandler}>
        <label>
          Seat Table for reservation {reservation_id}
          <br />
          <select name="table_id" id="table_id" onChange={changeHandler}>
            <option value="" selected>
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
    </main>
  );
}

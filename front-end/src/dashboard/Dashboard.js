import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ReservationsList from "../components/ReservationsList";
import ErrorAlert from "../layout/ErrorAlert";
import DatePicker from "../components/DatePicker";
import TableList from "../components/TableList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate, tables, setTables }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date: date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <DatePicker date={date} setDate={setDate} />
      <ErrorAlert error={reservationsError} />
      <div className="container-fluid">
        <div className="row h-100">
          <div className="col overflow-auto">
            <ReservationsList reservations={reservations} />
          </div>
          <div className="col-3 overflow-auto">
            <TableList tables={tables} setTables={setTables} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;

import React, { useEffect } from "react";
import ReservationsList from "../components/ReservationsList";
import ErrorAlert from "../layout/ErrorAlert";
import DatePicker from "../components/DatePicker";
import TableList from "../components/TableList";

import loadDashboard from "../utils/loadDashboard";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({
  date,
  setDate,
  tables,
  reservations,
  reservationsError,
  tablesError,
  setReservations,
  setReservationsError,
  setTables,
  setTablesError,
}) {
  useEffect(
    () =>
      loadDashboard(
        setReservations,
        setReservationsError,
        setTablesError,
        setTables,
        date
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [date]
  );

  return (
    <main>
      <div className="headerBar">
        <h1>Dashboard</h1>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">Reservations for {date}</h4>
        </div>
        <DatePicker date={date} setDate={setDate} />
      </div>
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
      <div className="container-fluid">
        <div className="row h-100">
          <div className="col overflow-auto">
            <ReservationsList reservations={reservations} />
          </div>
          <div className="col-4 overflow-auto">
            <TableList tables={tables} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;

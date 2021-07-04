import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ReservationsList from "../components/ReservationsList";
import ErrorAlert from "../layout/ErrorAlert";
import DatePicker from "../components/DatePicker";
import { formatAsDate, previous, next } from "../utils/date-time";
import useQuery from "../utils/useQuery";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  //const query = useQuery();
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [inquiryDate, setInquiryDate] = useState(date);

  useEffect(loadDashboard, [inquiryDate]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ inquiryDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {inquiryDate}</h4>
      </div>
      <DatePicker inquiryDate={inquiryDate} setInquiryDate={setInquiryDate} />
      <ErrorAlert error={reservationsError} />
      <ReservationsList reservations={reservations} />
    </main>
  );
}

export default Dashboard;

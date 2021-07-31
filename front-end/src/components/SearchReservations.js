import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";
import ReservationsList from "./ReservationsList";

export default function SearchReservations({
  reservations,
  setReservations,
  reservationsError,
  setReservationsError,
}) {
  const [searchNumber, setSearchNumber] = useState("");

  function handleChange(e) {
    const event = e.target;
    setSearchNumber(event.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const abort = new AbortController();
    const response = await listReservations(
      { mobile_number: searchNumber },
      abort.signal
    );
    if (!response.error) {
      setReservations(response);
    } else {
      setReservationsError(response);
      setReservations(null);
    }
  }

  return (
    <main>
      <div className="headerBar">
        <h1>Search</h1>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">Search reservations by Phone Number</h4>
        </div>
        <form className="row">
          <input
            className="form-control col-8"
            type="tel"
            placeholder="Enter a customer's phone number"
            name="mobile_number"
            id="mobile_number"
            onChange={handleChange}
            required
          ></input>
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={handleSubmit}
          >
            Find
          </button>
        </form>
      </div>
      <ErrorAlert error={reservationsError} />
      <ReservationsList reservations={reservations} />
    </main>
  );
}

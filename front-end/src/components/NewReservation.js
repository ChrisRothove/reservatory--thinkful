import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { today } from "../utils/date-time";
import { addReservation } from "../utils/api";

export default function NewReservation({ reservation }) {
  const date = today();
  const defaultFormData = reservation
    ? reservation
    : {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: date,
        reservation_time: 0,
        people: 1,
      };

  const [formData, setFormData] = useState({ ...defaultFormData });

  function onChangeHandler(e) {
    e.preventDefault();
    const event = e.target;
    setFormData({ ...formData, [event.name]: event.value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    const response = await addReservation(formData);
    console.log(response);
  }

  return (
    <form className="resList form" onSubmit={submitHandler}>
      <h3>New Reservation</h3>
      <label>
        First Name:
        <input
          type="text"
          id="firstName"
          name="first_name"
          value={formData.first_name}
          onChange={onChangeHandler}
          required
        ></input>
      </label>
      <label>
        Last Name:
        <input
          type="text"
          id="lastName"
          name="last_name"
          value={formData.last_name}
          onChange={onChangeHandler}
          required
        ></input>
      </label>
      <label>
        Mobile Number:
        <input
          type="tel"
          id="mobileNumber"
          name="mobile_number"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="000-000-0000"
          value={formData.mobile_number}
          onChange={onChangeHandler}
          required
        ></input>
      </label>
      <label>
        Date:
        <input
          type="date"
          id="reservationDate"
          name="reservation_date"
          onChange={onChangeHandler}
          required
        ></input>
      </label>
      <label>
        Time:
        <input
          type="time"
          id="reservationTime"
          name="reservation_time"
          value={formData.reservation_time}
          onChange={onChangeHandler}
          required
        ></input>
      </label>
      <label>
        Party Size:
        <input
          type="number"
          id="partySize"
          name="people"
          value={formData.people}
          onChange={onChangeHandler}
          min="1"
          required
        ></input>
      </label>
      <div className="buttons">
        <button className="btn btn-success" type="submit">
          Submit
        </button>
        <Link className="btn btn-danger" to="/reservations/">
          Back
        </Link>
      </div>
    </form>
  );
}

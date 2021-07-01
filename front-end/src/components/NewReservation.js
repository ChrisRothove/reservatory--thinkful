import React, { useEffect, useState } from "react";
import { today } from "../utils/date-time";

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
        party_size: 0,
      };

  const [formData, setFormData] = useState({ ...defaultFormData });

  function onChangeHandler(e) {
    e.preventDefault();
    const event = e.target;
    setFormData({ ...formData, [event.name]: event.value });
  }

  function submitHandler(e) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <form className="resList form" onSubmit={submitHandler}>
      <label>
        First Name:
        <input
          type="text"
          id="firstName"
          name="first_name"
          value={formData.first_name}
          onChange={onChangeHandler}
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
        ></input>
      </label>
      <label>
        Mobile Number:
        <input
          type="text"
          id="mobileNumber"
          name="mobile_number"
          value={formData.mobile_number}
          onChange={onChangeHandler}
        ></input>
      </label>
      <label>
        Date:
        <input
          type="text"
          id="reservationDate"
          name="reservation_date"
          value={formData.reservation_date}
          onChange={onChangeHandler}
        ></input>
      </label>
      <label>
        Time:
        <input
          type="text"
          id="reservationTime"
          name="reservation_time"
          value={formData.reservation_time}
          onChange={onChangeHandler}
        ></input>
      </label>
      <label>
        Party Size:
        <input
          type="text"
          id="partySize"
          name="party_size"
          value={formData.party_size}
          onChange={onChangeHandler}
        ></input>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
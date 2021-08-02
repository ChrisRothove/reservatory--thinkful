import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { today } from "../utils/date-time";
import { addReservation, getReservation } from "../utils/api";
import { getErrorComponent, getErrors } from "../utils/newReservationErrors";

export default function NewReservation({ setDate }) {
  const history = useHistory();

  const date = today();
  const defaultFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: date,
    reservation_time: "",
    people: 1,
  };

  const [formData, setFormData] = useState({ ...defaultFormData });
  const [errors, setErrors] = useState([]);

  function onChangeHandler(e) {
    e.preventDefault();
    const event = e.target;
    if (event.name === "people") {
      const people = Number(event.value);
      setFormData({ ...formData, people });
    } else {
      setFormData({ ...formData, [event.name]: event.value });
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    const newErrors = getErrors(
      formData.reservation_date,
      formData.reservation_time
    );
    if (newErrors.length) {
      setErrors(newErrors);
    } else {
      const response = await addReservation(formData);
      console.log(response.error);
      setDate(formData.reservation_date);
      history.push(`/reservations?date=${formData.reservation_date}`);
    }
  }

  function handleCancel(e) {
    e.preventDefault();
    setFormData({ ...defaultFormData });
    history.goBack();
  }

  return (
    <main>
      <div className="headerBar">
        <h1>New Reservation</h1>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">Book a new reservation below</h4>
        </div>
      </div>
      <form className="resList form" onSubmit={submitHandler}>
        {getErrorComponent(errors)}
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
          <button className="btn btn-danger" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}

import React from "react";

export default function ReservationsList({ reservations }) {
  if (reservations) {
    let offset = false;
    const reservationsMap = reservations.map((reservation) => {
      const {
        first_name,
        last_name,
        mobile_number,
        reservation_date,
        reservation_time,
      } = reservation;
      const offsetClass = offset ? "resList offset" : "resList";
      console.log(
        "🚀 ~ file: ReservationsList.js ~ line 16 ~ reservationsMap ~ offsetClass",
        offsetClass
      );
      offset = !offset;
      return (
        <div className={offsetClass}>
          <div className="name">
            <div>
              <strong>{first_name}</strong>
            </div>
            <div>
              <strong>{last_name}</strong>
            </div>
          </div>

          <div className="deets">
            <div>
              <strong>Phone:</strong> {mobile_number}
            </div>
            <div>
              <strong>Date:</strong> {reservation_date}
            </div>
            <div>
              <strong>Time:</strong> {reservation_time}
            </div>
          </div>
        </div>
      );
    });

    return <div>{reservationsMap}</div>;
  } else {
    return (
      <div classList="resList">
        <h2>There are no Reservations for this date.</h2>
      </div>
    );
  }
}

import React from "react";
import { useHistory } from "react-router";
import deleteReservationAlert from "../utils/deleteReservationAlert";

export default function ReservationsList({ reservations }) {
  const history = useHistory();
  if (reservations && reservations.length) {
    const reservationsMap = reservations.map((reservation) => {
      const {
        reservation_id,
        first_name,
        last_name,
        mobile_number,
        reservation_date,
        reservation_time,
        status,
      } = reservation;

      const seatButton =
        status === "booked" ? (
          <div className="buttons">
            <a
              className="btn btn-primary"
              href={`/reservations/${reservation.reservation_id}/seat`}
            >
              Seat
            </a>
          </div>
        ) : (
          <div></div>
        );

      return (
        <div key={reservation_id} className="resList">
          <div className="card-body">
            <div className="card-title name">
              <div>
                <strong>{first_name}</strong>
              </div>
              <div>
                <strong>{last_name}</strong>
              </div>
            </div>
            <div
              className="card-subtitle mb-2 text-muted"
              data-reservation-id-status={reservation_id}
            >
              {status}
            </div>
            <div className="card-text deets">
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
            <div className="buttons">
              {seatButton}
              <a
                href={`/reservations/${reservation.reservation_id}/edit`}
                className="btn btn-primary"
              >
                Edit
              </a>
              <button
                className="btn btn-danger"
                data-reservation-id-cancel={reservation.reservation_id}
                onClick={async function () {
                  await deleteReservationAlert(reservation_id);
                  history.push("/");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      );
    });

    return <div>{reservationsMap}</div>;
  } else {
    return (
      <div className="resList">
        <h2>No reservations found</h2>
      </div>
    );
  }
}

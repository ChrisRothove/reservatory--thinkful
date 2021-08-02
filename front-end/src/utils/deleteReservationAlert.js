import { cancelReservation } from "./api";

export default async function deleteReservationAlert(reservation_id) {
  if (
    window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    )
  ) {
    return await cancelReservation(reservation_id);
  } else {
    console.log("Cancel cancelled.");
  }
}

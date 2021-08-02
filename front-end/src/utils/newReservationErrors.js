//creates error messages for NewReservation.js component

import { today } from "./date-time";

export function getErrors(date, time) {
  const inputDate = new Date(date.split("-"));
  const splitTime = time.split(":");
  inputDate.setHours(splitTime[0], splitTime[1]);
  const todayDate = new Date();
  const errors = [];

  //Date is already past
  if (todayDate >= inputDate) {
    errors.push("reservation must be on a future date/time");
  }

  //day is a tuesday
  if (inputDate.getDay() === 2) {
    errors.push("Closed on Tuesdays.");
  }

  //time is before 10:30
  if (inputDate.getHours() <= 10) {
    if (inputDate.getHours() === 10) {
      if (inputDate.getMinutes() < 30) {
        errors.push("Closed before 10:30.");
      }
    } else {
      errors.push("Closed before 10:30.");
    }
  }

  //time is after 9:30
  if (inputDate.getHours() >= 21) {
    if (inputDate.getHours() === 21) {
      if (inputDate.getMinutes() > 30) {
        errors.push("Too close to closing time.");
      }
    } else {
      errors.push("Too close to closing time.");
    }
  }

  return errors;
}

export function getErrorComponent(errors) {
  if (errors !== []) {
    return errors.map((error) => {
      return (
        <div key={error} className="alert alert-danger">
          {error}
        </div>
      );
    });
  } else {
    return <div></div>;
  }
}

export default function unSeat(table_id) {
  if (
    window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    )
  ) {
    console.log("thumbs up");
  } else {
    console.log("canceled. No changes made.");
  }
}

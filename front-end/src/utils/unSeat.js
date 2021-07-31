import { unseatTable } from "./api";

export default async function unSeat(table_id, reservation_id) {
  if (
    window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    )
  ) {
    return await unseatTable(table_id, reservation_id);
  } else {
    console.log("canceled. No changes made.");
  }
}

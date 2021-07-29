import { listReservations } from "./api";
import { listTables } from "./api";

export default function loadDashboard(
  setReservations,
  setReservationsError,
  setTablesError,
  setTables,
  dashboardDate
) {
  const abortController = new AbortController();
  setReservationsError(null);
  listReservations({ date: dashboardDate }, abortController.signal)
    .then(setReservations)
    .catch(setReservationsError);
  setTablesError(null);
  listTables({}, abortController.signal).then(setTables).catch(setTablesError);
  return () => abortController.abort();
}

import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import NewReservation from "../components/NewReservation";
import { today } from "../utils/date-time";
import NewTable from "../components/NewTable";
import SeatATable from "../components/SeatATable";
import useQuery from "../utils/useQuery";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  /**~~~~~~~~~~~~~~~~SET STATES~~~~~~~~~~~~~~~*/
  const [dashboardDate, setDashboardDate] = useState(
    useQuery().get("date") || today()
  );

  const [reservations, setReservations] = useState([]);

  const [tables, setTables] = useState([]);

  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null);

  const queryDate = useQuery().get("date");

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations/new">
        <NewReservation reservation={null} setDate={setDashboardDate} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/tables/new">
        <NewTable />
      </Route>
      <Route exact={true} path="/tables">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <SeatATable
          tables={tables}
          dashboardDate={dashboardDate}
          tablesError={tablesError}
          setTables={setTables}
          setTablesError={setTablesError}
          setReservations={setReservations}
          setReservationsError={setReservationsError}
        />
      </Route>
      <Route path="/dashboard">
        <Dashboard
          date={dashboardDate}
          setDate={setDashboardDate}
          tables={tables}
          reservations={reservations}
          reservationsError={reservationsError}
          tablesError={tablesError}
          setReservations={setReservations}
          setReservationsError={setReservationsError}
          setTables={setTables}
          setTablesError={setTablesError}
        />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;

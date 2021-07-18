import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import NewReservation from "../components/NewReservation";
import { today } from "../utils/date-time";
import NewTable from "../components/NewTable";
import SeatATable from "../components/SeatATable";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const [dashboardDate, setDashboardDate] = useState(today());
  const [tables, setTables] = useState([
    {
      table_id: 1,
      table_name: "one",
      table_capacity: 4,
      occupied: false,
    },
    {
      table_id: 2,
      table_name: "two",
      table_capacity: 5,
      occupied: true,
    },
    {
      table_id: 3,
      table_name: "three",
      table_capacity: 6,
      occupied: false,
    },
  ]);

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
        <SeatATable tables={tables} setTables={setTables} />
      </Route>
      <Route path="/dashboard">
        <Dashboard
          date={dashboardDate}
          setDate={setDashboardDate}
          tables={tables}
          setTables={setTables}
        />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;

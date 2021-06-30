import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className="container-fluid">
      <div className="row min-vh-100 position-relative">
        <div className="min-vh-100 side-bar top-0 start-0">
          <Menu />
        </div>
        <div className="col">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;

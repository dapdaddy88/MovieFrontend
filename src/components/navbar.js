import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

function Navbar() {
  return (
    <Fragment>
      <div className="header-container">
        <h1>Movie Rating App</h1>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navbar
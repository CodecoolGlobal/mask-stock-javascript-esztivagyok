import React, { Outlet, useLocation, Link } from "react-router-dom";

const Nav = () => {
  const location = useLocation();

  if (location.pathname === "/") {
    return (
      <div>
        <Outlet />
      </div>
    );
  }

  return (
    <div>
      <nav>
        <Link to={`/order/${location.search}`}>Order</Link>
        <Link to={`/addHospital/${location.search}`}>Add new hospital</Link>
        <Link to={`/myHospitals/${location.search}`}>My hospitals</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Nav;

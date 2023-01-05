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
    <>
    <div className="welcomeBox">
      <nav>
        <Link to={`/order/${location.search}`} className="link">Order</Link>
        <Link to={`/addHospital/${location.search}`}className="link">Add new hospital</Link>
        <Link to={`/myHospitals/${location.search}`}className="link">My hospitals</Link>
      </nav>
    </div>
    <div>
    <Outlet />
    </div>
    </>
  );
};

export default Nav;

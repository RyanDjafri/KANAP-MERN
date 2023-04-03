import React, { useContext } from "react";
import { UidContext } from "../AppContext";

const Navbar = () => {
  const uid = useContext(UidContext);
  return (
    <div className="header">
      <div className="limitedWidthBlockContainer informations">
        <div className="limitedWidthBlock">
          <ul>
            <li>
              <i className="fa-solid fa-phone informations__phone"></i>
              01 23 45 67 89
            </li>
            <li>
              <i className="fa-solid fa-envelope informations__mail"></i>
              support@name.com
            </li>
            <li>
              <i className="fa-solid fa-location-dot informations__address"></i>
              01 23 45 67 89
            </li>
          </ul>
        </div>
        <div className="link-container">
          <>
            {uid ? (
              <>
                <a href="/" className="links">
                  Home
                </a>
                <a href="/" className="links">
                  Cart
                </a>
              </>
            ) : (
              <>
                <a href="/register" className="links">
                  Sign Up
                </a>
                <a href="/login" className="links">
                  Sign In
                </a>
              </>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

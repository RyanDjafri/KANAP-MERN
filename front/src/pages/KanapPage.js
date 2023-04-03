import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UidContext } from "../components/AppContext";

const KanapPage = () => {
  const uid = useContext(UidContext);
  const [kanaps, setKanaps] = useState([]);
  useEffect(() => {
    const params = new URLSearchParams(
      window.location.href.split("/").reverse()[0]
    );
    const id = params.get("id");
    console.log(id);
    axios({
      method: "get",
      url: `http://localhost:5000/api/products/${id}`,
    }).then((res) => console.log(res.data));
  }, [kanaps]);

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

export default KanapPage;

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Logging from "../../pages/Logging";
import Register from "../../pages/Register";
import PageError from "../../pages/PageError";
import KanapPage from "../../pages/KanapPage";
import axios from "axios";

const Router = () => {
  const [kanaps, setKanaps] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/products",
    }).then((res) => setKanaps(res.data));
  });

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Logging />}></Route>
          {kanaps.map((kanap) => {
            return (
              <Route
                path={"/id=" + kanap._id}
                kanap={kanap}
                key={kanap._id}
                element={<KanapPage />}
              ></Route>
            );
          })}
          {/* <Route path="/:id" element={<KanapPage />}></Route> */}
          <Route path="/*" element={<PageError />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;

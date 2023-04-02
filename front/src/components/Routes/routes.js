import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Logging from "../../pages/Logging";
import Register from "../../pages/Register";
import PageError from "../../pages/PageError";
const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Logging />}></Route>
          <Route path="/*" element={<PageError />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;

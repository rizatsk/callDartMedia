import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import jwtExmoClient from "./data/jwt";
import WebStore from "./data/WebStore";
import Authentication from "./pages/Authentication";
import Call from "./pages/Call";
import ProtectRoute from "./protected/ProtectRoute";
import ProtectRouteLogin from "./protected/ProtectRouteLogin";

const App = () => {
  const [jwt, setJwt] = useState("");

  useEffect(() => {
    setJwt(WebStore.checkCookies ? jwtExmoClient : null);
  });

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectRouteLogin />}>
            <Route path="/authentication" element={<Authentication />}></Route>
          </Route>

          <Route element={<ProtectRoute />}>
            <Route path="/" element={<Call jwt={jwt} />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

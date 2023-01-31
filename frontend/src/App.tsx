import React from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/molecules/Navigation/Navigation";
import { Error, Home, Signup, Login } from "./pages";

function App() {
  return (
    <div className="containergrid">
      <div className="overall-layout">
      <Navigation />
      <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Error />} path="*" />
      <Route element={<Signup />} path="/signup" />
      <Route element={<Login />} path="/login" />
    </Routes>
    </div>
    </div>
  );
}

export default App;

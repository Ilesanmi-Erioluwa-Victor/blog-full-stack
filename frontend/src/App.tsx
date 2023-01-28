import React from "react";
import { Routes, Route } from "react-router-dom";
import { Error, Home, Signup, Login } from "./pages";

function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Error />} path="*" />
      <Route element={<Signup />} path="/signup" />
      <Route element={<Login />} path="/login" />
    </Routes>
  );
}

export default App;

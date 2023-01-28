import React from "react";
import { Routes, Route} from "react-router-dom"
import Error from "./pages/Error";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route  element={<Error />} path="*"/>
      
    </Routes>
  );
}

export default App;

import React from "react";
import { Routes, Route} from "react-router-dom"
import Error from "./pages/Error";
// import { Button, Search } from "./components/atoms";

function App() {
  return (
    <Routes>
      <Route  element={<Error />} path="*"/>
      
    </Routes>
  );
}

export default App;

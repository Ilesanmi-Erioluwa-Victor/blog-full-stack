import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { NetworkStatus } from "./components/atoms";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <BrowserRouter>
      <NetworkStatus>
        <App />
      </NetworkStatus>
    </BrowserRouter>
  </>
);

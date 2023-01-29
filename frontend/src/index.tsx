import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { NetworkStatus } from "./components/atoms";
import { store } from "./redux/store";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
  <Provider store={store}>
    <BrowserRouter>
      <NetworkStatus>
        <App />
      </NetworkStatus>
    </BrowserRouter>
    </Provider>
  </>
);

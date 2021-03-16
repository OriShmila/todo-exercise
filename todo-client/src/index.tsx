import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { CustomMuiTheme } from "./components/custom-mui-theme";
import { UserActiveProvider } from "./context-provider";

ReactDOM.render(
  <CustomMuiTheme>
    <UserActiveProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserActiveProvider>
  </CustomMuiTheme>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

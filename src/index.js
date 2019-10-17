import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import "./styles.css";

// assign the app root to #root from index.html
// render the app from App.js
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

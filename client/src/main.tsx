import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Toaster />
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </>
);

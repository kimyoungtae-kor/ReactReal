import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ToastComponent from "./components/ToastComponent";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomAlert from "./components/CustomAlert";
import "./App.css"; 
import CustomConfirm from "./components/CustomConfirm";

const App = () => {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={5000} />
      <Routes>
        <Route path="/" element={<><ToastComponent /> <CustomAlert/> <CustomConfirm/></>} />
      </Routes>
    </Router>
  );
};

export default App;

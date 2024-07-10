import React from "react";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../Pages/Dashboard";
import { Home } from "../Pages/Home";
import { AddData } from "../Pages/AddData";
import { Error } from "../Pages/Error";
import { PrivateRoute } from "./PrivateRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      ></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route
        path="/addData"
        element={
          <PrivateRoute>
            <AddData />
          </PrivateRoute>
        }
      ></Route>
      <Route path="*" element={<Error />}></Route>
    </Routes>
  );
};

export { AllRoutes };

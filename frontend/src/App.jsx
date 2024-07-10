import { useState } from "react";
import { AllRoutes } from "./routes/AllRoutes";
import "./App.css";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <AllRoutes />
    </>
  );
}

export default App;

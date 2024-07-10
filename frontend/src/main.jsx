import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { FetchContextProvider } from "./context/FetchContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <FetchContextProvider>
    <AuthContextProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </AuthContextProvider>
    </FetchContextProvider>
  </BrowserRouter>
);

import React from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import { ThemeProvider } from "@mui/material/styles";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <ProtectedRoute />
    </div>
  );
}

export default App;

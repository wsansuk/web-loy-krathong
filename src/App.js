
import React from "react";
import { Route, Routes } from "react-router-dom";
import { CreateNew } from "./components/CreateNew";
import VirtualLoyKrathong from "./components/VirtualLoyKrathong";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateNew />} />
      <Route path="/virtual" element={<VirtualLoyKrathong />} />
    </Routes>
  );
}

export default App;

import "./App.css";
import React from "react";
import { UserManager } from "./pages/UserManager";

const App = () => {
  return (
    <div className="App">
      {/* add routes here */}
      <UserManager />
    </div>
  );
};

export default App;

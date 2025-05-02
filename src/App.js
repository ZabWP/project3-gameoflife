import React from "react";
import GameOfLife from "./game";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./register";
import Admin from "./admin";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="project3-gameoflife/" element={<GameOfLife />} />
          <Route path="/project3-gameoflife/" element={<GameOfLife />} />
          <Route path="/project3-gameoflife" element={<GameOfLife />} />

          <Route
            path="project3-gameoflife/*"
            element={<Navigate to="/project3-gameoflife" />}
          />

          <Route path="project3-gameoflife/register" element={<Register />} />
          <Route path="project3-gameoflife/admin" element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

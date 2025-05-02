import React from "react";
import GameOfLife from "./game";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="project3-gameoflife/" element={<GameOfLife />} />
          <Route
            path="project3-gameoflife/*"
            element={<Navigate to="/project3-gameoflife" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

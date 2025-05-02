import React, { useState, useRef } from "react";

// Size of the grid
const numRows = 25;
const numCols = 25;

// Function to generate a grid of specified size
const generateGrid = () =>
  Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => 0)
  );

// Neighbors of the current cell
// The offsets represent the relative positions of the neighbors
const neighborOffsets = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

// Preset patterns for the Game of Life
// [0,0] is the top-left corner of the  pattern
const presets = {
  Glider: [
    [1, 1],
    [1, 3],
    [2, 2],
    [2, 3],
    [3, 2],
  ],
  Blinker: [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  Toad: [
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  Beacon: [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
    [2, 2],
    [2, 3],
    [3, 2],
    [3, 3],
  ],
};

// Main component for the Game of Life
const GameOfLife = () => {
  // Initializing variables and grid
  const [grid, setGrid] = useState(() => generateGrid());
  const [running, setRunning] = useState(false);
  const [runCount, setRunCount] = useState(0);
  const runningRef = useRef(running);
  runningRef.current = running;

  // Recursive function to run the simulation
  const runSimulation = () => {
    if (!runningRef.current) return;

    // Function to update the grid
    setGrid((prevGrid) => {
      // Loop through each cell in the grid
      // For each cell, count the number of live cells around it
      return prevGrid.map((row, i) =>
        row.map((cell, j) => {
          let neighbors = 0;
          // Check each neighbor cell
          neighborOffsets.forEach(([x, y]) => {
            const newI = i + x;
            const newJ = j + y;
            // If the neighbor cell is alive, increment the count
            if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
              neighbors += prevGrid[newI][newJ];
            }
          });

          // Rules to the Game of Life
          // 1. Any live cell with fewer than two live neighbors dies (underpopulation).
          // OR
          // 2. Any live cell with three or more live neighbors dies (overpopulation).
          if (cell === 1 && (neighbors < 2 || neighbors > 3)) return 0;
          // 3. Any dead cell with exactly three live neighbors becomes a live cell (reproduction).
          if (cell === 0 && neighbors === 3) return 1;
          // 4. All other live cells remain alive.

          return cell;
        })
      );
    });

    // Call the function again after a short delay
    setTimeout(runSimulation, 200);
  };

  // Function to toggle the state of a cell on mouse click. (0 = dead, 1 = alive)
  const toggleCell = (i, j) => {
    const newGrid = grid.map((row) => [...row]);
    newGrid[i][j] = grid[i][j] ? 0 : 1;
    setGrid(newGrid);
  };

  // Function to clear the grid
  const clearGrid = () => setGrid(generateGrid());

  // Function to load a preset pattern into the grid
  const loadPreset = (name) => {
    const pattern = presets[name];
    const newGrid = generateGrid();

    // Calculate the offset to center the pattern in the grid
    const offsetRow = Math.floor(numRows / 2) - 2;
    const offsetCol = Math.floor(numCols / 2) - 2;

    pattern.forEach(([x, y]) => {
      const row = offsetRow + x;
      const col = offsetCol + y;
      if (row >= 0 && row < numRows && col >= 0 && col < numCols) {
        newGrid[row][col] = 1;
      }
    });

    setGrid(newGrid);
  };

  // Function to run a fixed number of generations
  const runFixedGenerations = () => {
    let gen = 0;
    let newGrid = [...grid];
    while (gen < runCount) {
      newGrid = newGrid.map((row, i) =>
        row.map((cell, j) => {
          let neighbors = 0;
          neighborOffsets.forEach(([x, y]) => {
            const ni = i + x;
            const nj = j + y;
            if (ni >= 0 && ni < numRows && nj >= 0 && nj < numCols) {
              neighbors += newGrid[ni][nj];
            }
          });

          // Rules to the Game of Life
          if (cell === 1 && (neighbors < 2 || neighbors > 3)) return 0;
          if (cell === 0 && neighbors === 3) return 1;
          return cell;
        })
      );
      gen++;
    }
    setGrid(newGrid);
  };

  return (
    // Main HTML component layout
    <div>
      <h2>Conway's Game of Life</h2>
      <div style={{ marginBottom: 10 }}>
        {/* Start Button */}
        <button
          onClick={() => {
            setRunning(!running);
            runningRef.current = !running;
            if (!running) runSimulation();
          }}
        >
          {running ? "Stop" : "Start"}
        </button>
        {/*input and button for fixed generation runs*/}
        <input
          type="number"
          min="1"
          value={runCount}
          onChange={(e) => setRunCount(Number(e.target.value))}
          placeholder="Generations"
          style={{ width: 120, marginLeft: 10 }}
        />
        <button onClick={runFixedGenerations} style={{ marginLeft: 10 }}>
          Run {runCount || ""} Generations
        </button>

        {/* Clear Grid button */}
        <button onClick={clearGrid} style={{ marginLeft: 10 }}>
          Clear
        </button>
      </div>

      {/* Preset Patterns */}
      <div style={{ marginTop: 10 }}>
        <span>Presets: </span>
        {Object.keys(presets).map((name) => (
          <button
            key={name}
            onClick={() => loadPreset(name)}
            style={{ marginRight: 5 }}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Grid Display */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
      >
        {grid.map((row, i) =>
          row.map((col, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => toggleCell(i, j)}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][j] ? "black" : "#f0f0f0",
                border: "1px solid #ddd",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GameOfLife;

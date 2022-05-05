import { slideTiles, canMove } from "./handlers/moveTiles.js";
import Grid from "./components/Grid.js";

const setupInput = () => {
  window.addEventListener("keydown", handleInput, { once: true });
};

const gameBoard = document.getElementById("game-board");

const grid = new Grid(gameBoard);
grid.generateTile(gameBoard);
grid.generateTile(gameBoard);
setupInput();

async function handleInput(e) {
  const cells = grid.getCellsByKey(e.key);
  if (!cells.length || !canMove(cells)) return setupInput();
  await slideTiles(cells);

  grid.mergeTiles();
  const availableMoves = grid.generateTile(gameBoard);
  if (!availableMoves) return;

  setupInput();
}

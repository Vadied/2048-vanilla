import { slideTiles, canMove } from "./handlers/moveTiles.js";
import Grid from "./components/Grid.js";
import Tile from "./components/Tile.js";

const setupInput = () => {
  window.addEventListener("keydown", handleInput, { once: true });
};

const gameBoard = document.getElementById("game-board");

const grid = new Grid(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);
setupInput();

async function handleInput(e) {
  const cells = grid.getCellsByKey(e.key);
  if (!cells.length || !canMove(cells)) return setupInput();
  await slideTiles(cells);

  grid.cells.forEach((c) => c.mergeTiles());

  const newTile = new Tile(gameBoard);
  grid.randomEmptyCell().tile = newTile;

  setupInput();
}

import Cell from "./Cell.js";
import Tile from "./Tile.js";

import { canMove } from "../handlers/moveTiles.js";
import { gridDimensions, keyEvent } from "../constants.js";
const { GRID_SIZE, CELL_SIZE, CELL_GAP } = gridDimensions;
const { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } = keyEvent;

const createCellElement = (gridElement) => {
  const cells = [];
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cells.push(cell);
    gridElement.append(cell);
  }

  return cells;
};
export default class Grid {
  #cells;

  constructor(gridElement) {
    gridElement.style.setProperty("--grid-size", GRID_SIZE);
    gridElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
    gridElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);
    this.#cells = createCellElement(gridElement).map((c, i) => {
      return new Cell(c, i % GRID_SIZE, Math.floor(i / GRID_SIZE));
    });
  }

  get #cellsByColumn() {
    return this.#cells.reduce((cellGrid, cell) => {
      cellGrid[cell.x] = cellGrid[cell.x] || [];
      cellGrid[cell.x][cell.y] = cell;
      return cellGrid;
    }, []);
  }

  get cellsByRow() {
    return this.#cells.reduce((cellGrid, cell) => {
      cellGrid[cell.y] = cellGrid[cell.y] || [];
      cellGrid[cell.y][cell.x] = cell;
      return cellGrid;
    }, []);
  }

  get cells() {
    return this.#cells;
  }

  get #emptyCell() {
    return this.#cells.filter((c) => !c.tile);
  }

  randomEmptyCell() {
    const randomIndex = Math.floor(Math.random() * this.#emptyCell.length);
    return this.#emptyCell[randomIndex];
  }

  getCellsByKey(key) {
    if (key === ArrowUp) return this.#cellsByColumn;
    if (key === ArrowDown)
      return this.#cellsByColumn.map((column) => [...column].reverse());
    if (key === ArrowLeft) return this.cellsByRow;
    if (key === ArrowRight)
      return this.cellsByRow.map((column) => [...column].reverse());
    return [];
  }

  mergeTiles() {
    this.#cells.forEach((c) => c.mergeTiles());
  }

  generateTile(tileContainer) {
    const newTile = new Tile(tileContainer);
    this.randomEmptyCell().tile = newTile;

    if (!this.areAvailableMoves())
      newTile.waitForTransition({ animation: true }).then(() => {
        console.log("test");
        alert("Hai finito le mosse!");
      });

    return this.areAvailableMoves();
  }

  areAvailableMoves() {
    return (
      canMove(this.getCellsByKey(ArrowUp)) ||
      canMove(this.getCellsByKey(ArrowDown)) ||
      canMove(this.getCellsByKey(ArrowLeft)) ||
      canMove(this.getCellsByKey(ArrowRight))
    );
  }
}

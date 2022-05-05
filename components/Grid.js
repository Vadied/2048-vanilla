const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;

import Cell from "./Cell.js";

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

  get cellsByColumn() {
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
    if (key === "ArrowUp") return this.cellsByColumn;
    if (key === "ArrowDown")
      return this.cellsByColumn.map((column) => [...column].reverse());
    if (key === "ArrowLeft") return this.cellsByRow;
    if (key === "ArrowRight")
      return this.cellsByRow.map((column) => [...column].reverse());
    return [];
  }
}

function createCellElement(gridElement) {
  const cells = [];
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cells.push(cell);
    gridElement.append(cell);
  }

  return cells;
}

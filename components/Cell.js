export default class Cell {
  #cellElement;
  #x;
  #y;
  #tile;
  #mergeTile;

  constructor(cellElement, x, y) {
    this.#cellElement = cellElement;
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get tile() {
    return this.#tile;
  }

  set tile(value) {
    this.#tile = value;
    if (!value) return;

    this.#tile.x = this.#x;
    this.#tile.y = this.#y;
  }

  get mergeTile() {
    return this.#mergeTile;
  }

  set mergeTile(tile) {
    this.#mergeTile = tile;

    if (!tile) return;
    this.#mergeTile.x = this.x;
    this.#mergeTile.y = this.y;
  }

  canAccept(tile) {
    return !this.#tile || (!this.#mergeTile && this.#tile.value === tile.value);
  }

  mergeTiles() {
    if (!this.#tile || !this.#mergeTile) return;

    this.#tile.value = this.#tile.value + this.#mergeTile.value;
    this.#mergeTile.remove();
    this.#mergeTile = null;
  }
}

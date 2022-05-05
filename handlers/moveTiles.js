export const canMove = (cells) =>
  cells.some((group) =>
    group.some((cell, index) => {
      if (!index) return false;
      if (!cell.tile) return false;

      const moveToCell = group[index - 1];
      return moveToCell.canAccept(cell.tile);
    })
  );

export const slideTiles = (cells) => {
  return Promise.all(
    cells.flatMap((group) => {
      const promises = [];
      for (let i = 1; i < group.length; i++) {
        let lastValidCell;
        const cell = group[i];
        if (!cell.tile) continue;

        for (let j = i - 1; j >= 0; j--) {
          const moveToCell = group[j];
          if (!moveToCell.canAccept(cell.tile)) break;
          lastValidCell = moveToCell;
        }

        if (lastValidCell) {
          promises.push(cell.tile.waitForTransition);
          if (lastValidCell.tile) {
            lastValidCell.mergeTile = cell.tile;
          } else {
            lastValidCell.tile = cell.tile;
          }
          cell.tile = null;
        }
      }

      return promises;
    })
  );
};

export default { slideTiles, canMove };

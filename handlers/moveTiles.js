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

      group.forEach((cell, i) => {
        if (!i || !cell.tile) return;

        let lastValidCell;
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
      });

      return promises;
    })
  );
};

export default { slideTiles, canMove };

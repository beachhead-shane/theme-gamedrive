import { IGameCell } from "../../Types/IGameCell";

export const generatePotentialMovesList = (cell: IGameCell) => {
  const potentialMoves = [
    { x: cell.x + 1, y: cell.y },
    { x: cell.x - 1, y: cell.y },
    { x: cell.x, y: cell.y + 1 },
    { x: cell.x, y: cell.y - 1 },
    { x: cell.x + 1, y: cell.y + 1 },
    { x: cell.x - 1, y: cell.y - 1 },
    { x: cell.x + 1, y: cell.y - 1 },
    { x: cell.x - 1, y: cell.y + 1 },
  ];

  return potentialMoves;
};

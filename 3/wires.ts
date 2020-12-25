import { coords2str, manhattanDistance, str2coords } from "../utils/coords";
export type WireGrid = Map<string, number[]>;

const DIRECTIONS = {
  U: [0, 1],
  D: [0, -1],
  R: [1, 0],
  L: [-1, 0],
};

const isDirection = (direction: string): direction is "U" | "D" | "R" | "L" =>
  ["U", "D", "R", "L"].includes(direction);

export const setupWires = (wires: string[], grid: WireGrid) => {
  wires.forEach((wire, index) => {
    const wireSegments = wire.split(",");
    let [x, y] = [0, 0];
    wireSegments.forEach((segment) => {
      const direction = segment[0];
      const distance = parseInt(segment.substring(1));
      if (!isDirection(direction)) return;

      for (let k = 1; k <= distance; k++) {
        const coords = coords2str([
          x + DIRECTIONS[direction][0],
          y + DIRECTIONS[direction][1],
        ]);
        if (!grid.has(coords)) {
          grid.set(coords, new Array(wires.length).fill(0));
        }
        grid.get(coords)[index] = 1;
        [x, y] = str2coords(coords);
      }
    });
  });
};

const isIntersectionBetweenWires = (intersections: number[]): boolean => {
  return intersections.filter((value) => value > 0).length > 1;
};

export const getIntersectionManhattanDistances = (grid: WireGrid): number[] => {
  const distances: number[] = [];
  for (const [coords, intersections] of grid) {
    if (isIntersectionBetweenWires(intersections))
      distances.push(manhattanDistance(coords));
  }

  return distances;
};

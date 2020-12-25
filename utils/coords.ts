export const str2coords = (str: string): number[] =>
  str.split(",").map((value) => parseInt(value));

export const coords2str = (coords: number[]): string => coords.join(",");

export const manhattanDistance = (coords: number[] | string): number => {
  const [x, ...rest] = typeof coords === "string" ? str2coords(coords) : coords;
  if (rest.length === 0) return Math.abs(x);
  return Math.abs(x) + manhattanDistance(rest);
};

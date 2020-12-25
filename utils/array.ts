export const sum = <T extends number>(array: T[]): number => {
  if (array.length === 0) return 0;
  const [x, ...rest] = array;
  return x + sum(rest);
};

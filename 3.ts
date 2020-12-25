import { getIntersectionManhattanDistances, setupWires } from "./3/wires";
import { lineBreak, title, result, text } from "./utils/console";
import { getLinesOfFile } from "./utils/getLinesOfFile";

const playScenario = async (path: string) => {
  const lines = await getLinesOfFile(path);

  title(
    `First exercise: get the Manhattan distance of the closest wire intersection.`,
    "green"
  );

  const wireGrid = new Map<string, number[]>();
  setupWires(lines, wireGrid);

  const distances = getIntersectionManhattanDistances(wireGrid);
  text(distances);

  result("result:", Math.min(...distances));
  lineBreak();

  // title(`Second exercise: ZZZZ.`, "green");

  // // code here

  // result("result:", 0);
  // lineBreak();
};

async function main() {
  title("Example scenario", "cyan");
  await playScenario("input/3.example");
  lineBreak();

  title("----------------------------------");
  lineBreak();

  title("Real scenario", "cyan");
  await playScenario("input/3");
  lineBreak();
}

main();

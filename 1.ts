import { lineBreak, title, result, text } from "./utils/console";
import { getLinesOfFile } from "./utils/getLinesOfFile";

const getModuleFuelRequirement = (
  mass: number,
  verbose: boolean = false
): number => {
  const requirement = Math.floor(mass / 3) - 2;
  if (verbose)
    text("The fuel requirement for a module of mass", mass, "is", requirement);
  return requirement;
};

const playScenario = async (path: string) => {
  const lines = await getLinesOfFile(path);

  title(
    `First exercise: Calculate the fuel requirements for the rocket.`,
    "green"
  );

  const totalFuelRequirement = lines.reduce(
    (requirement, module) =>
      requirement + getModuleFuelRequirement(parseInt(module), false),
    0
  );

  result("result:", totalFuelRequirement);
  lineBreak();

  // title(`Second exercise: ZZZZ.`, "green");

  // // code here

  // result("result:", 0);
  // lineBreak();
};

async function main() {
  title("Example scenario", "cyan");
  await playScenario("input/1.example");
  lineBreak();

  title("----------------------------------");
  lineBreak();

  title("Real scenario", "cyan");
  await playScenario("input/1");
  lineBreak();
}

main();

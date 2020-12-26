import { lineBreak, title, result, error, text } from "./utils/console";
import { getLinesOfFile } from "./utils/getLinesOfFile";
import { executeProgram, getProgram, runProgram } from "./utils/intcode";

const playScenario = async (path: string) => {
  const lines = await getLinesOfFile(path);

  title(
    `First exercise: Upgrade the Intcode computer and execute the programs.`,
    "green"
  );
  try {
    const program1 = getProgram(lines[0]);
    runProgram(program1, 1);
  } catch (e) {
    error(e);
  }

  lineBreak();

  // title(`Second exercise: ZZZZ.`, "green");

  // // code here

  // result("result:", 0);
  // lineBreak();
};

async function main() {
  title("Real scenario", "cyan");
  await playScenario("input/5");
  lineBreak();
}

main();

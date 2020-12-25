import { lineBreak, title, result, text } from "./utils/console";
import { getLinesOfFile } from "./utils/getLinesOfFile";
import { executeProgram, getProgram } from "./utils/intcode";

const playScenario = async (path: string) => {
  const lines = await getLinesOfFile(path);
  const program = getProgram(lines[0]);

  title(
    `First exercise: Execute the program and get the value at address 0 just before the 1202 program alarm.`,
    "green"
  );

  if (!path.includes("example")) {
    program[1] = 12;
    program[2] = 2;
  }

  executeProgram(program);
  // text(program);

  result("result:", program[0]);
  lineBreak();

  // title(`Second exercise: ZZZZ.`, "green");

  // // code here

  // result("result:", 0);
  // lineBreak();
};

async function main() {
  title("Example scenario", "cyan");
  await playScenario("input/2.example");
  lineBreak();

  title("----------------------------------");
  lineBreak();

  title("Real scenario", "cyan");
  await playScenario("input/2");
  lineBreak();
}

main();

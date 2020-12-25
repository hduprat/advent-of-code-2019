import { lineBreak, title, result, text, error } from "./utils/console";
import { colors } from "./utils/consoleColors";
import { getLinesOfFile } from "./utils/getLinesOfFile";
import { executeProgram, getProgram } from "./utils/intcode";

const playScenario = async (path: string) => {
  const lines = await getLinesOfFile(path);
  const program = getProgram(lines[0]);

  title(
    `First exercise: Execute the program and get the value at address 0 just before the 1202 program alarm.`,
    "green"
  );

  const testProgram = [...program];

  if (!path.includes("example")) {
    testProgram[1] = 12;
    testProgram[2] = 2;
  }

  executeProgram(testProgram);
  // text(testProgram);

  result("result:", testProgram[0]);
  lineBreak();
  if (path.includes("example")) return;

  title(
    `Second exercise: Find the noun and verb that makes the program output ${colors.magenta}19690720${colors.green}.`,
    "green"
  );

  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const nounVerbProgram = [...program];
      nounVerbProgram[1] = noun;
      nounVerbProgram[2] = verb;
      executeProgram(nounVerbProgram);
      if (nounVerbProgram[0] === 19690720) {
        result("result:", 100 * noun + verb);
        lineBreak();
        return;
      }
    }
  }

  error("No noun or verb complies :(");
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

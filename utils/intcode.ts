import { lineBreak, text } from "./console";

export const getProgram = (line: string): number[] =>
  line.split(",").map((val) => parseInt(val));

const NUMBER_OF_PARAMS: { [opcode: number]: number } = {
  1: 3,
  2: 3,
  3: 1,
  4: 1,
  99: 0,
};

export function* executeProgram(
  program: number[],
  input: number = 0,
  verbose: boolean = false
): Generator<number | undefined, void, void> {
  let i = 0;

  while (true) {
    const opcode = program[i] % 100;
    const modes = Math.floor(program[i] / 100)
      .toString()
      .padStart(NUMBER_OF_PARAMS[opcode] || 0, "0")
      .split("")
      .reverse()
      .map((val) => parseInt(val));
    const parameters = program.slice(i + 1, i + NUMBER_OF_PARAMS[opcode] + 1);
    const get = (k: number) =>
      modes[k] === 1 ? parameters[k] : program[parameters[k]];
    const display = (k: number): string =>
      modes[k] === 1
        ? parameters[k].toString()
        : `value at address ${parameters[k]}`;

    if (verbose) text("Opcode:", opcode, "- Modes:", modes);

    switch (opcode) {
      case 1:
        if (verbose)
          text(
            "Adding",
            display(0),
            "and",
            display(1),
            "and assign it to address",
            parameters[2]
          );
        program[parameters[2]] = get(0) + get(1);
        yield undefined;
        break;
      case 2:
        if (verbose)
          text(
            "Multiplying",
            display(0),
            "and",
            display(1),
            "and assign it to address",
            parameters[2]
          );
        program[parameters[2]] = get(0) * get(1);
        yield undefined;
        break;
      case 3:
        if (verbose)
          text("Assigning input", input, "to address", parameters[0]);
        program[parameters[0]] = input;
        yield undefined;
        break;
      case 4:
        if (verbose) text("Outputting", display(0));
        yield get(0);
        break;
      case 99:
        if (verbose) text("End of program");
        return;
      default:
        throw new Error("Bad Opcode: " + opcode);
    }
    i += NUMBER_OF_PARAMS[opcode] + 1;
    if (verbose) lineBreak();
  }
}

export const runProgram = (program: number[], input: number = 0) => {
  const programGenerator = executeProgram(program, input);
  let programLine = programGenerator.next();
  while (!programLine.done) {
    if (programLine.value !== undefined)
      text("New program output", programLine.value);
    programLine = programGenerator.next();
  }
};

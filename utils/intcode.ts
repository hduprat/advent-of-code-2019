import { text } from "./console";

export const getProgram = (line: string): number[] =>
  line.split(",").map((val) => parseInt(val));

export const executeProgram = (program: number[]) => {
  let i = 0;
  while (true) {
    const opcode = program[i];
    switch (opcode) {
      case 1: {
        const parameters = program.slice(i, i + 4);
        program[parameters[3]] =
          program[parameters[1]] + program[parameters[2]];
        i += 4;
        continue;
      }
      case 2: {
        const parameters = program.slice(i, i + 4);
        program[parameters[3]] =
          program[parameters[1]] * program[parameters[2]];
        i += 4;
        continue;
      }
      case 99:
        return;
      default:
        throw new Error("Bad Opcode: " + opcode);
    }
  }
};

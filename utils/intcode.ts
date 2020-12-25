export const getProgram = (line: string): number[] =>
  line.split(",").map((val) => parseInt(val));

export const executeProgram = (program: number[]) => {
  for (let i = 0; i < program.length; i += 4) {
    const opcode = program[i];
    switch (opcode) {
      case 1:
        program[program[i + 3]] =
          program[program[i + 1]] + program[program[i + 2]];
        continue;
      case 2:
        program[program[i + 3]] =
          program[program[i + 1]] * program[program[i + 2]];
        continue;
      case 99:
        return;
      default:
        throw new Error("Bad Opcode: " + opcode);
    }
  }
};

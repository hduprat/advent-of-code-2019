export const getProgram = (line: string): number[] =>
  line.split(",").map((val) => parseInt(val));

const NUMBER_OF_PARAMS: { [opcode: number]: number } = {
  1: 3,
  2: 3,
  3: 1,
  4: 1,
  99: 0,
};

export const executeProgram = (program: number[], input: number = 0) => {
  let i = 0;

  while (true) {
    const opcode = program[i] % 100;
    const modes = Math.floor(program[i] / 100)
      .toString()
      .padStart(NUMBER_OF_PARAMS[opcode] || 0, "0")
      .split("")
      .reverse()
      .map((val) => parseInt(val));
    const get = (k: number) => (modes[k] === 1 ? k : program[k]);
    const parameters = program.slice(i, i + NUMBER_OF_PARAMS[opcode] + 1);
    switch (opcode) {
      case 1: {
        program[parameters[3]] = get(parameters[1]) + get(parameters[2]);
        break;
      }
      case 2: {
        const parameters = program.slice(i, i + 4);
        program[parameters[3]] = get(parameters[1]) * get(parameters[2]);
        break;
      }
      case 99:
        return;
      default:
        throw new Error("Bad Opcode: " + opcode);
    }
    i += NUMBER_OF_PARAMS[opcode] + 1;
  }
};

import { lineBreak, title, text } from "./utils/console";
import { colors, modifiers } from "./utils/consoleColors";
import { getLinesOfFile } from "./utils/getLinesOfFile";
import { test, testEach } from "./utils/test";

type Criterion = (n: number) => boolean;

const DOUBLE_ADJACENT_DIGIT_REGEX = /(\d)\1/;
const hasDoubleDigit: Criterion = (n) =>
  DOUBLE_ADJACENT_DIGIT_REGEX.test(n.toString());

const hasOnlyIncreasingDigits: Criterion = (n) =>
  n.toString().split("").sort().join("") === n.toString();

const DOUBLE_ADJACENT_DIGIT_ONLY_REGEX = /(?:(\d)(\d(?!\1))\2(?!\2))|(?:^(\d)\3(?!\3))/;
const hasDoubleDigitNotPartOfLargerGroup: Criterion = (n) =>
  DOUBLE_ADJACENT_DIGIT_ONLY_REGEX.test(n.toString());

const meetsCriteria = (n: number, criteria: Criterion[]) => {
  for (const criterion of criteria) {
    if (!criterion(n)) return false;
  }

  return true;
};

const getAllValuesMeetingCriteria = (
  min: number,
  max: number,
  criteria: Criterion[]
): number[] => {
  const values = [];
  for (let n = min; n <= max; n++) {
    if (meetsCriteria(n, criteria)) values.push(n);
  }
  return values;
};

const playScenario = async (path: string) => {
  const lines = await getLinesOfFile(path);
  const [a, b] = lines[0].split("-").map((k) => parseInt(k));

  title(`Find how many passwords can be mine in the provided range.`, "green");
  lineBreak();

  const criteria = [hasDoubleDigit, hasOnlyIncreasingDigits];

  text("But first, let's check some numbers.");
  test(`{{value}} should meet the criteria.`, 111111, (v) =>
    meetsCriteria(v, criteria)
  );
  testEach(
    `{{value}} should NOT meet the criteria.`,
    [223450, 123789],
    (v) => !meetsCriteria(v, criteria)
  );
  lineBreak();

  text("Let's find the possible passwords!");
  const possiblePasswords = getAllValuesMeetingCriteria(a, b, criteria);

  text(
    `There are${modifiers.bold + colors.yellow}`,
    possiblePasswords.length,
    `${modifiers.reset}passwords that meet the criteria.`
  );
  lineBreak();

  title(
    `Second exercise: find the possible passwords also matching the additional criterion.`,
    "green"
  );
  lineBreak();

  const newCriteria = [...criteria, hasDoubleDigitNotPartOfLargerGroup];

  text("But first, let's check some numbers.");
  testEach(
    `{{value}} should NOT meet the criteria.`,
    [123444, 155579, 266668, 333348, 111111, 355555],
    (v) => !meetsCriteria(v, newCriteria)
  );
  testEach(
    `{{value}} should meet the criteria.`,
    [112233, 111122, 333448, 335555],
    (v) => meetsCriteria(v, newCriteria)
  );
  lineBreak();

  text("Let's find the possible passwords!");
  const newPossiblePasswords = getAllValuesMeetingCriteria(a, b, newCriteria);

  text(
    `There are${modifiers.bold + colors.yellow}`,
    newPossiblePasswords.length,
    `${modifiers.reset}passwords that meet the criteria.`
  );
  lineBreak();
};

async function main() {
  title("Real scenario", "cyan");
  await playScenario("input/4");
  lineBreak();
}

main();

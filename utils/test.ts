import { text } from "./console";
import { colors, modifiers } from "./consoleColors";

export const test = <V>(
  title: string,
  value: V,
  predicate: (value: V) => boolean
) => {
  const testTitle = title.replace(
    "{{value}}",
    `${modifiers.bold + colors.cyan}${value}${modifiers.reset}`
  );
  text(testTitle, predicate(value) ? "👍🏼" : "👎🏼");
};

export const testEach = <V>(
  title: string,
  values: V[],
  predicate: (value: V) => boolean
) => {
  values.forEach((val) => test(title, val, predicate));
};

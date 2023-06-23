/* eslint-disable @typescript-eslint/quotes */

enum Primary {
  Jl900 = `#201452`,
  Jl800 = `#37257B`,
  Jl700 = `#4D37A5`,
  Jl600 = `#6448CE`,
  Jl500 = `#7A5AF8`,
  Jl400 = `#957BF9`,
  Jl300 = `#AF9CFB`,
  Jl200 = `#CABDFC`,
  Jl100 = `#E4DEFE`,
  Jl50 = `#F2EFFE`,
}

enum Neutral {}

enum Secondary {}

enum Tertiary {}

enum Error {}

const JLColorPalette = {
  Primary,
  Neutral,
  Secondary,
  Tertiary,
  Error,
};

export type Colors = Primary | Neutral | Secondary | Tertiary | Error;

export const Color = {
  ...JLColorPalette,
};

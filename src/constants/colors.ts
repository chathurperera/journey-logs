/* eslint-disable @typescript-eslint/quotes */

enum Primary {
  Jl900 = `#201452`,
  Jl800 = `#37257B`,
  Jl700 = `#4D37A5`,
  Jl600 = `#6448CE`,
  Jl500 = `#7A5AF8`,
  Jl450 = `#9E1DFF`,
  Jl400 = `#957BF9`,
  Jl300 = `#AF9CFB`,
  Jl200 = `#CABDFC`,
  Jl150 = `#F8FAFC`,
  Jl100 = `#E4DEFE`,
  Jl50 = `#F2EFFE`,
}

enum Neutral {
  black = `#000000`,
  JL900 = `#080808`,
  JL800 = `#101010`,
  JL700 = `#181818`,
  JL600 = `#202020`,
  JL500 = `#282828`,
  JL400 = `#464646`,
  JL300 = `#636363`,
  JL200 = `#818181`,
  JL100 = `#9E9E9E`,
  JL50 = `#ADADAD`,
  white = `#ffffff`,
}

enum Secondary {
  JL300 = `#f1f1f1f5`,
  JL200 = `#FCFCFC`,
  jl100 = `#B4AEAE`,
}

enum Tertiary {}

enum Error {}

enum Warning {
  JL100 = `#CC6D00`,
}

const JLColorPalette = {
  Primary,
  Neutral,
  Secondary,
  Tertiary,
  Error,
  Warning,
};

export type Colors = Primary | Neutral | Secondary | Tertiary | Error;

export const Color = {
  ...JLColorPalette,
};

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
  JL900 = `#303030`,
  JL800 = `#3f3f3f`,
  JL700 = `#525252`,
  JL600 = `#696969`,
  JL500 = `#737373`,
  JL400 = `#8f8f8f`,
  JL300 = `#a1a1a1`,
  JL200 = `#bfbfbf`,
  JL100 = `#d4d4d4`,
  JL50 = `#f1f1f1`,
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

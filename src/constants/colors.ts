/* eslint-disable @typescript-eslint/quotes */

enum Primary {
  Jl900 = `#152c6b`,
  Jl800 = `#1c3a8c`,
  Jl700 = `#244bb5`,
  Jl600 = `#2e60e8`,
  Jl500 = `#3269ff`,
  Jl400 = `#5b87ff`,
  Jl300 = `#769bff`,
  Jl200 = `#a1baff`,
  Jl100 = `#bfd1ff`,
  Jl50 = `#ebf0ff`,
}

enum Neutral {
  black = `#000000`,
  JL900 = `#303030`,
  JL800 = `#3f3f3f`,
  JL700 = `#525252`,
  JL600 = `#696969`,
  JL500 = `#737373`,
  JL400 = `#8f8f8f`,
  JL350 = `#fafafa`,
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
  JL50 = `#fff3e6`,
  JL100 = `#ffdab0`,
  JL200 = `#ffc88a`,
  JL300 = `#ffaf54`,
  JL400 = `#ffa033`,
  JL500 = `#ff8800`,
  JL600 = `#e87c00`,
  JL700 = `#b56100`,
  JL800 = `#8c4b00`,
  JL900 = `#6b3900`,
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

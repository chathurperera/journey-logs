/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextVariant } from '@jl/constants';

const FontWeight = {
  Thin: 100,
  ExtraLight: 200,
  Light: 300,
  Regular: 400,
  Medium: 500,
  SemiBold: 600,
  Bold: 700,
  ExtraBold: 800,
  Black: 900,
};

export const AppTextStyles: Record<TextVariant, React.CSSProperties> = {
  //Headings
  [TextVariant.Heading1]: {
    fontSize: '60px',
    fontWeight: FontWeight.Bold,
    lineHeight: 72,
  },
  [TextVariant.Heading2]: {
    fontSize: '48px',
    fontWeight: FontWeight.Bold,
    lineHeight: 64,
  },
  [TextVariant.Heading3]: {
    fontSize: '40px',
    fontWeight: FontWeight.Regular,
    lineHeight: 48,
  },

  // Title 1
  [TextVariant.Title1]: {
    fontSize: '28px',
    fontWeight: FontWeight.SemiBold,
    lineHeight: 40,
  },

  // Title 2
  [TextVariant.Title2]: {
    fontSize: '28px',
    fontWeight: FontWeight.SemiBold,
    lineHeight: 40,
  },

  // Body 1
  [TextVariant.Body1SemiBold]: {
    fontSize: '18px',
    fontWeight: FontWeight.Bold,
    lineHeight: 28,
  },
  [TextVariant.Body1Regular]: {
    fontSize: '18px',
    fontWeight: FontWeight.Regular,
    lineHeight: 28,
  },

  // Body 2
  [TextVariant.Body2SemiBold]: {
    fontSize: '16px',
    fontWeight: FontWeight.SemiBold,
    lineHeight: 24,
  },
  [TextVariant.Body2Regular]: {
    fontSize: '16px',
    fontWeight: FontWeight.Regular,
    lineHeight: 24,
  },

  // Labels
  [TextVariant.Labels]: {
    fontSize: '15px',
    fontWeight: FontWeight.SemiBold,
    lineHeight: 24,
  },

  // Links
  [TextVariant.Links]: {
    fontSize: '16px',
    fontWeight: FontWeight.Bold,
    lineHeight: 20,
  },
};

function mapFontWeights(fontWeight: any) {
  switch (fontWeight) {
    case 100:
      return 'font-thin';
    case 200:
      return 'font-extralight';
    case 300:
      return 'font-light';
    case 400:
      return 'font-normal';
    case 500:
      return 'font-medium';
    case 600:
      return 'font-semibold';
    case 700:
      return 'font-bold';
    case 800:
      return 'font-extrabold';
    case 900:
      return 'font-black';
  }
}

export function getAppTextStyles(variant: TextVariant) {
  const variantStyle = AppTextStyles[variant];

  console.log('variantStyle', variantStyle);

  let textStyles = `${mapFontWeights(variantStyle.fontWeight)} text-[${variantStyle.fontSize}]`;

  switch (variant) {
    case TextVariant.Title2:
    case TextVariant.Body1SemiBold:
    case TextVariant.Body2SemiBold:
      textStyles += ' font-InterSemiBold';
      break;
    default:
      textStyles += ' font-Inter';
  }

  return textStyles;
}

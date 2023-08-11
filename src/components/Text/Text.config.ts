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
  [TextVariant.Heading1Regular]: {
    fontSize: '32px',
    fontWeight: FontWeight.Regular,
    lineHeight: 72,
  },
  [TextVariant.Heading1Bold]: {
    fontSize: '32px',
    fontWeight: FontWeight.Bold,
    lineHeight: 64,
  },

  [TextVariant.Heading2Bold]: {
    fontSize: '29px',
    fontWeight: FontWeight.Bold,
    lineHeight: 64,
  },

  [TextVariant.Heading3Regular]: {
    fontSize: '26px',
    fontWeight: FontWeight.Regular,
    lineHeight: 48,
  },

  [TextVariant.Heading3SemiBold]: {
    fontSize: '20px',
    fontWeight: FontWeight.SemiBold,
    lineHeight: 48,
  },

  // Title 1
  [TextVariant.Title1]: {
    fontSize: '20px',
    fontWeight: FontWeight.Regular,
    lineHeight: 40,
  },

  // Title 2
  [TextVariant.Title2]: {
    fontSize: '23px',
    fontWeight: FontWeight.Regular,
    lineHeight: 40,
  },

  // Body 1
  [TextVariant.Body1SemiBold]: {
    fontSize: '16px',
    fontWeight: FontWeight.SemiBold,
    lineHeight: 28,
  },
  [TextVariant.Body1Regular]: {
    fontSize: '16px',
    fontWeight: FontWeight.Regular,
    lineHeight: 28,
  },

  // Body 2
  [TextVariant.Body2SemiBold]: {
    fontSize: '18px',
    fontWeight: FontWeight.SemiBold,
    lineHeight: 24,
  },
  [TextVariant.Body2Regular]: {
    fontSize: '18px',
    fontWeight: FontWeight.Regular,
    lineHeight: 24,
  },

  // Label 1
  [TextVariant.Label1Regular]: {
    fontSize: '13px',
    fontWeight: FontWeight.Regular,
    lineHeight: 24,
  },

  // Label 2
  [TextVariant.Label2Regular]: {
    fontSize: '13px',
    fontWeight: FontWeight.Regular,
    lineHeight: 24,
  },

  [TextVariant.Label2SemiBold]: {
    fontSize: '13px',
    fontWeight: FontWeight.SemiBold,
    lineHeight: 24,
  },

  // Links
  [TextVariant.Link]: {
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

function mapFontSizes(fontSize: any) {
  switch (fontSize) {
    case '13px':
      return 'text-extraSmall';
    case '14px':
      return 'text-small';
    case '16px':
      return 'text-base';
    case '18px':
      return 'text-medium';
    case '20px':
      return 'text-lg';
    case '23px':
      return 'text-xlg';
    case '26px':
      return 'text-2xlg';
    case '29px':
      return 'text-3xlg';
    case '32px':
      return 'text-4xlg';
  }
}

export function getAppTextStyles(variant: TextVariant) {
  const variantStyle = AppTextStyles[variant];

  let textStyles = `${mapFontWeights(variantStyle?.fontWeight)} ${mapFontSizes(
    variantStyle?.fontSize,
  )}`;

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

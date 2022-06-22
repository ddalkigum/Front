interface ITheme {
  azureRadiance: string;
  lochmara: string;
  malibu: string;
  white: string;
  black: string;
  persianPink: string;
  deepBlush: string;
  illusion: string;
  text: string;
  buttonText: string;
  subText: string;
  hoverGray: string;
  line: string;
  boldLine: string;
  homeBackground: string;
  cardBackground: string;
}

export const theme: ITheme = {
  // Main color
  azureRadiance: '#009AFE',
  lochmara: '#0087DB',
  malibu: '#4EB8FE',
  white: '#fff',
  black: '#000',

  // Negative
  persianPink: '#F582C6',
  deepBlush: '#E569B1',
  illusion: '#F8A8D7',

  // Text, Line color
  text: '#212121',
  buttonText: '#fff',
  boldLine: '#bdbdbd',
  line: '#e6e6e6',
  subText: '#747474',
  hoverGray: '#a8a8a8',

  // Common Background
  homeBackground: '#F5F5F5',
  cardBackground: '#fff',
};

interface IColorPalette {
  background: string;
  color: string;
  hoverBackground: string;
}

type IColor = {
  [color: string]: IColorPalette;
};

export const buttonColor: IColor = {
  blue: {
    background: theme.azureRadiance,
    color: theme.buttonText,
    hoverBackground: theme.lochmara,
  },

  pink: {
    background: theme.persianPink,
    color: theme.buttonText,
    hoverBackground: theme.deepBlush,
  },

  gray: {
    background: theme.boldLine,
    color: theme.buttonText,
    hoverBackground: theme.hoverGray,
  },
};

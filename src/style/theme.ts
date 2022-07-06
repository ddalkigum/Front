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
  azureRadiance: 'var(--color-primary-50)',
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

const newTheme = {
  dark: {
    mainBackground: 'var(--color-black-30)',
    cardBackground: 'var(--color-black-10)',
    text: 'var(--color-black-90)',
    subText: 'var(--color-black-70)',
    line: 'var(--color-black-20)',
    deactivateButtonBackground: 'var(--color-black-40)',
    hoverDeactivateButtonBackground: 'var(--color-black-60)',

    primary50: 'var(--color-primary-50)',
    primary40: 'var(--color-primary-40)',
    primary30: 'var(--color-primary-30)',
    primary20: 'var(--color-primary-20)',

    primaryRelative50: 'var(--color-primary-relative-50)',
    primaryRelative40: 'var(--color-primary-relative-40)',
    primaryRelative30: 'var(--color-primary-relative-30)',
    primaryRelative20: 'var(--color-primary-relative-20)',
  },
  light: {
    mainBackground: 'var(--color-black-70)',
    font: 'var(--color-black-10)',
  },
};

export const getTheme = (isDark: 'dark' | 'light') => {
  return newTheme[isDark];
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

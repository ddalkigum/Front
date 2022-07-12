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

export interface ThemePalette {
  mainBackground: string;
  cardBackground: string;

  text: string;
  subText: string;
  subTextHover: string;

  line: string;
  deactivateButtonBackground: string;
  hoverDeactivateButtonBackground: string;

  primaryText: string;
  primary50: string;
  primary40: string;
  primary30: string;
  primary20: string;

  primaryRelativeText: string;
  primaryRelative70: string;
  primaryRelative60: string;
  primaryRelative50: string;
  primaryRelative40: string;
}

const newTheme: { light: ThemePalette; dark: ThemePalette } = {
  light: {
    mainBackground: 'var(--color-black-10)',
    cardBackground: 'var(--color-black-5)',
    text: 'var(--color-black-90)',
    subText: 'var(--color-black-60)',
    subTextHover: 'var(--color-black-40)',
    line: 'var(--color-black-20)',
    deactivateButtonBackground: 'var(--color-black-50)',
    hoverDeactivateButtonBackground: 'var(--color-black-40)',

    primaryText: 'var(--color-black-0)',
    primary50: 'var(--color-primary-50)',
    primary40: 'var(--color-primary-40)',
    primary30: 'var(--color-primary-30)',
    primary20: 'var(--color-primary-20)',

    primaryRelativeText: 'var(--color-black-90)',
    primaryRelative70: 'var(--color-primary-relative-70)',
    primaryRelative60: 'var(--color-primary-relative-60)',
    primaryRelative50: 'var(--color-primary-relative-50)',
    primaryRelative40: 'var(--color-primary-relative-40)',
  },
  dark: {
    mainBackground: 'var(--color-black-90)',
    cardBackground: 'var(--color-black-85)',
    text: 'var(--color-black-10)',
    subText: 'var(--color-black-60)',
    subTextHover: 'var(--color-black-40)',
    line: 'var(--color-black-80)',
    deactivateButtonBackground: 'var(--color-black-40)',
    hoverDeactivateButtonBackground: 'var(--color-black-50)',

    primaryText: 'var(--color-black-0)',
    primary50: 'var(--color-primary-50)',
    primary40: 'var(--color-primary-40)',
    primary30: 'var(--color-primary-30)',
    primary20: 'var(--color-primary-20)',

    primaryRelativeText: 'var(--color-black-90)',
    primaryRelative70: 'var(--color-primary-relative-70)',
    primaryRelative60: 'var(--color-primary-relative-60)',
    primaryRelative50: 'var(--color-primary-relative-50)',
    primaryRelative40: 'var(--color-primary-relative-40)',
  },
};

export const currentTheme = {
  light: newTheme.light,
  dark: newTheme.dark,
};

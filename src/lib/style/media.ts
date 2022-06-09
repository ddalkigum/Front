export const mediaQuery = (maxWidth: number) => {
  return `@media (max-width: ${maxWidth})`;
};

export const media = {
  xxlarge: mediaQuery(1920),
  xlarge: mediaQuery(1440),
  large: mediaQuery(1200),
  medium: mediaQuery(1024),
  small: mediaQuery(768),
  sxmall: mediaQuery(375),
};

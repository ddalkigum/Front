import React from 'react';
import styled from 'styled-components';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import { animated, useSpring } from 'react-spring';
import { themeModeHandler } from '../../atom';

const { useEffect, useCallback } = React;

const Block = styled(animated.div)`
  border-radius: 1.5rem;
  color: ${(props) => props.theme.text};
  padding: 0.5rem;
  cursor: pointer;

  :hover {
    background: ${(props) => props.theme.line};
  }
`;

const ToggleThemeButton = () => {
  const [isDark, setTheme] = useRecoilState(themeModeHandler);
  const localStorageTheme = localStorage.getItem('theme');

  useEffect(() => {
    setTheme(localStorageTheme === 'dark' ? true : false);
  }, [isDark]);

  const style = useSpring({
    to: { opacity: 1, x: 0 },
    from: { opacity: 0, x: 20 },
    reset: true,
  });

  const changeMode = () => {
    const themeMode = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', themeMode);
    setTheme(!isDark);
  };

  return (
    <Block style={style}>
      {isDark ? (
        <BsFillMoonFill onClick={changeMode} size="1.5rem" />
      ) : (
        <BsFillSunFill onClick={changeMode} size="1.5rem" />
      )}
    </Block>
  );
};

export default ToggleThemeButton;

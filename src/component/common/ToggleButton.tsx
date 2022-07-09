import React from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { theme } from '../../style/theme';
import { BaseResponse } from '../../lib/api/interface';
import { Notify } from '../../types/entity';

const { useState, useCallback, useEffect } = React;

const Block = styled.div<{ isActive }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 3.5rem;
  height: 1.875rem;
  background: ${(props) =>
    props.isActive ? theme.azureRadiance : theme.boldLine};

  border-radius: 1.25rem;
  transition: 0.4s;
`;

const ToggleCircle = styled(animated.div)`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 1rem;
  background: ${theme.white};
`;

export interface ToggleButtonProps {
  type: string;
  active: boolean;
  changeAction: (
    type: string,
    isActive: boolean
  ) => Promise<BaseResponse<Notify>>;
}

const ToggleButton = ({ type, active, changeAction }: ToggleButtonProps) => {
  const [isActive, setActive] = useState(active);

  const style = useSpring({
    to: { x: isActive ? 30 : 2 },
    from: { x: isActive ? 0 : 30 },
  });

  const toggleActive = useCallback(() => {
    setActive(!isActive);
    changeAction(type, !isActive);
  }, [isActive]);

  return (
    <Block onClick={toggleActive} isActive={isActive}>
      <ToggleCircle style={style} />
    </Block>
  );
};

export default ToggleButton;

import React from 'react';
import styled from 'styled-components';

const Icon = styled.svg.attrs({
  version: ' 1.1',
  xmlns: ' http://www.w3.org/2000/svg',
  xmlnsXlink: ' http://www.w3.org/1999/xlink',
  viewBox: '0 0 1000 1000',
})``;

const SvgIcon = styled(Icon)`
  width: 1rem;
  height: 1rem;
`;

const UserIcon = ({ color }) => {
  return (
    <SvgIcon>
      <g>
        <path d="M53.5,10L53.5,10L53.5,10z" fill={color} />
        <path
          d="M648.8,564.4c32.6-13.3,61.4-32.5,86.4-57.4c25-25,44.5-54.1,58.4-87.4c14-33.3,21-68.2,21-104.9c0-74.6-26.5-138.3-79.4-191.3S618.5,44,543.9,44c-74.6,0-138.3,26.5-191.3,79.4s-79.4,116.7-79.4,191.3c0,28,4.2,55.1,12.5,81.4c8.3,26.3,20,50.3,35,71.9c15,21.7,33,41,54,58c21,17,43.8,30.5,68.4,40.5c-57.3,14.7-108.9,40.3-154.8,76.9c-45.9,36.6-82.4,81.6-109.4,134.9S138.4,888.1,138.4,948c0,13.3,1,27.3,3,42h803.1c0.7-6.7,1.2-13.3,1.5-20s0.5-13.6,0.5-21c0-91.2-28-172.5-83.9-243.7C806.7,634.1,735.4,587.1,648.8,564.4L648.8,564.4z"
          fill={color}
        />
      </g>
    </SvgIcon>
  );
};
export default UserIcon;

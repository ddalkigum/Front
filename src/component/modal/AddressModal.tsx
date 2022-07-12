import React from 'react';
import styled from 'styled-components';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { theme } from '../../style/theme';
import CloseIcon from '../icon/Close';
import RoundButton from '../common/RoundButton';

const { useState } = React;
const geoCoder = new kakao.maps.services.Geocoder();

const ModalBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 1;
  background: rgba(0, 0, 0, 0.6);
`;

const Modal = styled.div`
  width: 606px;
  height: 480px;
  margin: auto;
  background: ${(props) => props.theme.mainBackground};
  z-index: 3;
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
`;

const CloseIconArea = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem 0;
`;

const TitleArea = styled.div`
  padding: 0 0 1.5rem 0;
`;

const AddressArea = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.5rem 0 0 0;
  height: 2.5rem;
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.5rem;
`;

const AddressModal = ({
  isOpen,
  setOpen,
  currentAddress,
  setCurrentAddress,
}) => {
  const [position, setPosition] = useState({
    lat: 37.5666805,
    lng: 126.9784147,
  });

  const closeModal = () => {
    document.body.style.overflowY = null;
    setOpen(!isOpen);
  };

  const modifyPosition = (target, event: kakao.maps.event.MouseEvent) => {
    const lat = event.latLng.getLat();
    const lng = event.latLng.getLng();

    geoCoder.coord2Address(lng, lat, (result, status) => {
      const fullAddress = result[0].address.address_name;
      const simpleAddress = fullAddress.split(' ').slice(0, 3).join(' ');
      setCurrentAddress(simpleAddress);
    });

    setPosition({ lat, lng });
  };

  const confirmAddress = () => {
    if (!currentAddress) {
      alert('위치를 선택해주세요');
    } else {
      document.body.style.overflowY = null;
      setOpen(!isOpen);
    }
  };

  return (
    <ModalBlock>
      <Modal>
        <CloseIconArea>
          <CloseIcon width="1rem" height="1rem" onClick={closeModal} />
        </CloseIconArea>
        <TitleArea>
          <h3>위치를 선택해주세요</h3>
        </TitleArea>
        <Map
          center={position}
          style={{ width: '100%', height: '300px' }}
          level={3}
          onClick={modifyPosition}
        >
          <MapMarker position={position} />
        </Map>
        <AddressArea>
          {currentAddress ? <h4>{currentAddress}</h4> : null}
        </AddressArea>
        <ButtonArea>
          <RoundButton
            color="blue"
            size="DEFAULT"
            text="확인"
            onClick={confirmAddress}
          />
        </ButtonArea>
      </Modal>
    </ModalBlock>
  );
};

export default AddressModal;

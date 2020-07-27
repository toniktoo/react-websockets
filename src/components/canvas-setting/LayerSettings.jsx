import React, { useState } from 'react';
import styled from 'styled-components';

import {
  BgColorsOutlined,
  ClearOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { ColorPicker } from './ColorPicker';

const Wrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 16px;
  width: 20%;
`;

const Main = styled.div`
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #b5acac;
  border-radius: 3px;
  display: flex;
  align-items: center;
  padding: 4px;
  margin-bottom: 5px;
  font-size: 25px;
`;

const BtnMain = styled.span`
  border: 1px solid #b5acac;
  border-radius: 3px;
  padding: 2px;
  margin-right: 4px;
  display: flex;
  align-items: center;
`;

const LayerSettings = ({ socket }) => {
  const [isOpenColorPocker, setIsOpenColorPocker] = useState(false);

  return (
    <Wrapper>
      <Main>
        <BtnMain>
          <BgColorsOutlined
            onClick={() => setIsOpenColorPocker(!isOpenColorPocker)}
          />
        </BtnMain>
        <BtnMain>
          <EditOutlined />
        </BtnMain>
        <BtnMain>
          <ClearOutlined />
        </BtnMain>
      </Main>
      <ColorPicker isOpenColorPocker={isOpenColorPocker} socket={socket} />
    </Wrapper>
  );
};

export default LayerSettings;

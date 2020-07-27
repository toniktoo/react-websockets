import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { Slider, InputNumber } from 'antd';
import { TwitterPicker } from 'react-color';
import { changeColorMouse, changeSizeMouse } from '../../redux/actions/point';

const TwitterPickerWrapper = styled(TwitterPicker)`
  width: 100% !important;
`;
const SizeMouseWrapper = styled.div`
  background: rgb(255, 255, 255);
  border: 0px solid rgba(0, 0, 0, 0.25);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 4px;
  border-radius: 4px;
  width: 100%;
  padding: 15px;
`;

const SizeMouse = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InputSizeMouse = styled(InputNumber)`
  margin: 0 0 0 16px;
`;
const SliderSizeMouse = styled(Slider)`
  width: 100%;
`;

const arrColor = ['#00D084', '#8ED1FC', '#0693E3', '#EB144C', '#000'];

export const ColorPicker = ({ isOpenColorPocker, socket }) => {
  const dispatch = useDispatch();
  const [color, setColor] = useState('#000');
  const { sizeMouse } = useSelector((state) => state.pointReducer);

  useEffect(() => {
    socket.on('mouseSettingsGet', (data) => {
      if (data) {
        console.log(data);
        dispatch(changeColorMouse({ colorMouse: data.colorMouse }));
      }
    });
    return () => socket.on('mouseSettingsGet');
  }, []);

  const handleChangeColor = (color, event) => {
    setColor(color);
  };

  const handleChangeCompleteColor = (color, event) => {
    dispatch(changeColorMouse({ colorMouse: color.hex }));
    socket.emit('mouseSettingsSend', { colorMouse: color.hex });
  };

  const handleChangeSizeMouse = (value) => {
    dispatch(changeSizeMouse({ sizeMouse: value }));
  };
  return (
    <>
      {isOpenColorPocker ? (
        <>
          <TwitterPickerWrapper
            onChange={handleChangeColor}
            onChangeComplete={handleChangeCompleteColor}
            colors={arrColor}
            color={color}
          />
          <SizeMouseWrapper>
            <h3>Размер кисти:</h3>
            <SizeMouse>
              <SliderSizeMouse
                min={1}
                max={30}
                onChange={handleChangeSizeMouse}
                value={typeof sizeMouse === 'number' ? sizeMouse : 0}
              />
              <InputSizeMouse
                min={1}
                max={30}
                value={sizeMouse}
                onChange={handleChangeSizeMouse}
              />
            </SizeMouse>
          </SizeMouseWrapper>
        </>
      ) : null}
    </>
  );
};

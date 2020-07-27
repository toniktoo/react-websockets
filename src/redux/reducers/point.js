import { handleActions } from 'redux-actions';

import {
  setIsPainting,
  changeColorMouse,
  changeSizeMouse,
} from '../actions/point';

const initState = {
  isPainting: false,
  colorMouse: '#000',
  sizeMouse: 5,
};

export const pointReducer = handleActions(
  {
    [setIsPainting]: (state, { payload }) => {
      return { ...state };
    },
    [changeColorMouse]: (state, { payload: { colorMouse } }) => {
      return { ...state, colorMouse };
    },
    [changeSizeMouse]: (state, { payload: { sizeMouse } }) => {
      return { ...state, sizeMouse };
    },
  },
  initState
);

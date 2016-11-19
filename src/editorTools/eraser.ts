import createZoomWithWheel from './zoomWithWheel';
import { Cursor } from 'utils/constants';

import {
  removeManualLandmark,
} from 'actions/workspace';

import {
  isLandmarkRemovable,
} from 'store/reducers/workspace/analysis';

export const createEraser: EditorToolCreator = (
  state: GenericState,
  dispatch: DispatchFunction,
) => {
  const isRemovable = isLandmarkRemovable(state);
  return {
    ...createZoomWithWheel(state, dispatch),
    onLandmarkClick(symbol) {
      if (isRemovable(symbol)) {
        dispatch(removeManualLandmark(symbol));
      }
    },

    onLandmarkMouseEnter(symbol) {
      if (isRemovable(symbol)) {
        // @TODO: set tooltip: 'Click to remove'
      } else {
        // @TODO: set tooltip: 'Cannot remove'
      }
    },

    onLandmarkMouseLeave(_) {
      // @TODO
    },

    onCanvasMouseEnter() {
      // @TODO
    },

    onCanvasMouseLeave() {
      // @TODO
    },

    getCursorForLandmark(symbol) {
      if (isRemovable(symbol)) {
        return Cursor.REMOVE_LANDMARK;
      }
      return Cursor.REMOVE_LANDMARK_DISABLED;
    },

    getCursorForCanvas() {
      return Cursor.REMOVE_LANDMARK_NO_TARGET;
    },

    shouldShowLens: false,
  };
};

export default createEraser;

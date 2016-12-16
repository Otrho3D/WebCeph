import { handleActions } from 'utils/store';
import { createSelector } from 'reselect';

const KEY_IS_EXPORTING: StoreKey = 'workspace.export.isExporting';
const KEY_EXPORT_ERROR: StoreKey = 'workspace.export.error';

const isExportingReducer = handleActions<typeof KEY_IS_EXPORTING>({
  EXPORT_FILE_REQUESTED: () => true,
  EXPORT_FILE_FAILED: () => false,
  EXPORT_FILE_SUCEEDED: () => false,
}, false);

const exportErrorReducer = handleActions<typeof KEY_EXPORT_ERROR>({
  EXPORT_FILE_REQUESTED: () => null,
  EXPORT_FILE_FAILED: (_, { payload }) => payload,
  IGNORE_WORKSPACE_ERROR_REQUESTED: () => null,
}, null);

const reducers: Partial<ReducerMap> = {
  [KEY_IS_EXPORTING]: isExportingReducer,
  [KEY_EXPORT_ERROR]: exportErrorReducer,
};

export default reducers;

export const isExporting = (state: StoreState) => state[KEY_IS_EXPORTING];
export const getExportError = (state: StoreState) => state[KEY_EXPORT_ERROR];
export const hasExportError = createSelector(
  getExportError,
  (error) => error !== null,
);

// Actions
import { ConfigActions, ConfigActionTypes } from '../_actions/config.actions';
import {ConfigResponse} from '../_models';

export interface ConfigState {
  config: ConfigResponse;
  _isConfigLoaded: boolean;
}

export const initialConfigState: ConfigState = {
  config: undefined,
  _isConfigLoaded: false,
};

export function configReducer(
  state = initialConfigState,
  action: ConfigActions
): ConfigState {
  switch (action.type) {
    case ConfigActionTypes.ConfigRequested:
      return {
        ...state,
        _isConfigLoaded: false,
      };
    case ConfigActionTypes.ConfigLoaded:
      const config: ConfigResponse = action.payload.config
      return {
        ...state,
        config,
        _isConfigLoaded: true,
      }
    default:
      return state;
  }
}

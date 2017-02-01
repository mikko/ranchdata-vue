import { set } from 'vue';
import * as types from './mutation-types';

export default {

  [types.ADD_SENSOR](state, { sensor }) {
    set(state.sensors, sensor.id, sensor);
  },

  [types.UPDATE_SENSOR_LATEST_VALUE](state, { sensorId, latestValue }) {
    set(state.sensors[sensorId], 'latestValue', latestValue);
  },

  [types.TOGGLE_BLUEPRINT_EDIT_MODE](state, { newValue }) {
    set(state.blueprint, 'editMode', newValue);
  },

};

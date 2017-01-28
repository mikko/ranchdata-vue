import { set } from 'vue';
import * as types from './mutation-types';

export default {

  [types.ADD_SENSOR](state, { sensor }) {
    set(state.sensors, sensor.name, sensor);
  },

  [types.UPDATE_SENSOR_LATEST_VALUE](state, { sensorName, latestValue }) {
    set(state.sensors[sensorName], 'latestValue', latestValue);
  },

};

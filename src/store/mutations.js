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

  [types.BLUEPRINT_SET_DATA](state, { blueprintData }) {
    set(state.blueprint, 'data', blueprintData);
  },

  [types.BLUEPRINT_ADD_EXTERIOR_WALL](state, { wall }) {
    state.blueprint.data.exteriorWalls.push(wall);
  },

  [types.BLUEPRINT_ADD_INTERIOR_WALL](state, { newWall }) {
    state.blueprint.data.interiorWalls.push(newWall);
  },

  [types.BLUEPRINT_CLEAR_INTERIOR_WALL](state) {
    set(state.blueprint.data, 'interiorWalls', []);
  },
};

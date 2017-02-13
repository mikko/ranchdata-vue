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
    set(state.view.internal, 'drawMode', newValue);
  },

  [types.TOGGLE_VIEW_EDIT_MODE](state, { newValue }) {
    set(state.view.internal, 'editMode', newValue);
  },

  [types.BLUEPRINT_SET_DATA](state, { blueprintData }) {
    set(state.view, 'blueprint', blueprintData);
  },

  [types.BLUEPRINT_ADD_EXTERIOR_WALL](state, { wall }) {
    state.view.blueprint.exteriorWalls.push(wall);
  },

  [types.BLUEPRINT_ADD_INTERIOR_WALL](state, { newWall }) {
    state.view.blueprint.interiorWalls.push(newWall);
  },

  [types.BLUEPRINT_CLEAR_INTERIOR_WALL](state) {
    set(state.view.blueprint, 'interiorWalls', []);
  },

  [types.TOGGLE_JOURNAL_ADD_MODE](state, { newValue }) {
    set(state.journal, 'addMode', newValue);
  },

  [types.JOURNAL_SET_MESSAGES](state, { messages }) {
    set(state.journal, 'messages', messages);
  },

  [types.VIEW_SET_SENSOR_POSITION](state, { sensorId, x, y }) {
    set(state.view.sensors[sensorId], 'x', x);
    set(state.view.sensors[sensorId], 'y', y);
  },

  [types.VIEW_SET_SENSOR_VISIBILITY](state, { sensorId, newVisibility }) {
    set(state.view.sensors[sensorId], 'visible', newVisibility);
  },

  [types.VIEW_SET_SENSOR_DATA](state, { sensorData }) {
    set(state.view, 'sensors', sensorData);
  },

  [types.VIEW_SET_DATA](state, { viewData }) {
    set(state, 'view', viewData);
  },

};

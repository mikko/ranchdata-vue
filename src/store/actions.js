import Vue from 'vue';
import * as types from './mutation-types';

// const latency = 200;

export const initialize = ({ commit, getters }) => {
  Vue.http.get(`${document.location.origin}/api/v1/sensors`)
    .then((sensorResponse) => {
      const sensors = sensorResponse.body;
      sensors.forEach((sensor) => {
        const newSensor = sensor;
        if (sensor.name === '') {
          newSensor.name = sensor.serial;
        }
        commit(types.ADD_SENSOR, { sensor: newSensor });
      });
    });

  setInterval(() => {
    getters.sensors.forEach((sensor) => {
      Vue.http.get(`${document.location.origin}/api/v1/measurements/latest/${sensor.id}`)
        .then((measurementResponse) => {
          const value = measurementResponse.body.value;
          commit(types.UPDATE_SENSOR_LATEST_VALUE,
            { sensorId: sensor.id,
              latestValue: value,
            });
        });
    });
  }, 1000);

  Vue.http.get(`${document.location.origin}/api/v1/views`)
    .then((viewsResponse) => {
      const view = viewsResponse.body;
      console.log(view);
      if (view !== undefined &&
        view.viewdata !== undefined &&
        view.viewdata.exteriorWalls !== undefined &&
        view.viewdata.interiorWalls !== undefined) {
        const blueprintData = view.viewdata;
        commit(types.BLUEPRINT_SET_DATA, { blueprintData });
      }
    });
};

export const syncBlueprint = ({ getters }) => {
  const currentBlueprint = getters.blueprint;
  Vue.http.post(`${document.location.origin}/api/v1/view`, {
    title: 'todo',
    viewData: currentBlueprint,
  });
};

export const saveBlueprint = () => {

};

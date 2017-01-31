import Vue from 'vue';
import * as types from './mutation-types';

// const latency = 200;

export const initialize = ({ commit, getters }) => {
  Vue.http.get(`${document.location.origin}/api/v1/sensors`)
    .then((sensorResponse) => {
      console.log(sensorResponse.body);
      const sensors = sensorResponse.body;
      sensors.forEach(sensor => commit(types.ADD_SENSOR, { sensor }));
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
};

export const otherAction = () => {

};


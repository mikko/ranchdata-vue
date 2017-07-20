import * as Api from '../util/api';
import * as types from '../store/mutation-types';

export const getSensors = ({ commit }) => Api.getSensors()
    .then((sensors) => {
      sensors.forEach((sensor) => {
        const newSensor = sensor;
        if (sensor.name === '') {
          newSensor.name = sensor.serial;
        }
        commit(types.ADD_SENSOR, { sensor: newSensor });
      });
    });

export const refreshLatestMeasurements = ({ commit, getters }) => {
  console.log('Refreshing latest measurements');
  getters.sensors.forEach((sensor) => {
    Api.getLatestMeasurements(sensor.serial)
      .then(value => commit(types.UPDATE_SENSOR_LATEST_VALUE,
        {
          sensorId: sensor.id,
          latestValue: value,
        })
      );
  });
};

export const refreshRelevantJournalEntries = ({ commit }) => {
  Api.getRelevantJournalEntries(10)
    .then(messages => commit(types.JOURNAL_SET_MESSAGES, { messages }));
};

export const refreshViews = ({ commit, getters }) => {
  // Currently only single view is supported
  Api.getViews()
    .then((view) => {
      if (view !== undefined &&
        view.viewdata !== undefined &&
        view.viewdata.blueprint.exteriorWalls !== undefined &&
        view.viewdata.blueprint.interiorWalls !== undefined) {
        const blueprintData = {
          exteriorWalls: view.viewdata.blueprint.exteriorWalls,
          interiorWalls: view.viewdata.blueprint.interiorWalls,
        };
        commit(types.BLUEPRINT_SET_DATA, { blueprintData });
        const sensorData = view.viewdata.sensors;
        getters.sensors.forEach((sensor, index) => {
          if (sensorData[sensor.id] === undefined) {
            sensorData[sensor.id] = {
              visible: true,
              x: 100,
              y: 100 + (index * 50),
            };
          }
        });
        commit(types.VIEW_SET_SENSOR_DATA, { sensorData });
      }
    });
};

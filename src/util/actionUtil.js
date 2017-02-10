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
    Api.getLatestMeasurements(sensor.id)
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

export const refreshViews = ({ commit }) => {
  // Currently only single view is supported
  Api.getViews()
    .then((view) => {
      if (view !== undefined &&
        view.viewdata !== undefined &&
        view.viewdata.exteriorWalls !== undefined &&
        view.viewdata.interiorWalls !== undefined) {
        const blueprintData = view.viewdata;
        commit(types.BLUEPRINT_SET_DATA, { blueprintData });
      }
    });
};

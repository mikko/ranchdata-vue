import * as types from './mutation-types';

const latency = 200;

export const initialize = ({ commit }) => {
  const sensors = {
    mockSensor1: {
      name: 'mockSensor1',
      unit: 'kg',
      latestValue: 1,
      id: 0,
    },
    mockSensor2: {
      name: 'mockSensor2',
      unit: 'kg',
      latestValue: 22,
      id: 0,
    },
    mockSensor3: {
      name: 'mockSensor3',
      unit: 'kg',
      latestValue: 333,
      id: 0,
    },
    mockSensor4: {
      name: 'mockSensor4',
      unit: 'kg',
      latestValue: 4444,
      id: 0,
    },
  };

  Object.keys(sensors).forEach((sensorName, index) => {
    console.log(index);
    setTimeout(() => commit(types.ADD_SENSOR, { sensor: sensors[sensorName] }), latency * index);
  });

  setInterval(() => {
    const sensorCount = Object.keys(sensors).length;
    const randomSensor = sensors[Object.keys(sensors)[Math.floor(Math.random() * sensorCount)]];
    commit(types.UPDATE_SENSOR_LATEST_VALUE,
      { sensorName: randomSensor.name,
        latestValue: (Math.random() * 100).toFixed(1),
      });
  }, 1000);
};

export const otherAction = () => {

};


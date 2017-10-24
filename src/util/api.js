import Vue from 'vue';

export const getSensors = () => Vue.http.get(`${document.location.origin}/api/v1/sensors`)
    .then(sensorResponse => Promise.resolve(sensorResponse.body));

export const getLatestMeasurements = sensor => Vue.http.get(`${document.location.origin}/api/v1/sensor/${encodeURIComponent(sensor)}/latest`)
  .then(measurementResponse => Promise.resolve(measurementResponse.body.value));

export const getRelevantJournalEntries = count => Vue.http.get(`${document.location.origin}/api/v1/journalentries/relevant/${count}`)
  .then(messagesResponse => Promise.resolve(messagesResponse.body));

export const getViews = () => Vue.http.get(`${document.location.origin}/api/v1/views`)
    .then(viewsResponse => Promise.resolve(viewsResponse.body));

export const getMeasurementSeries = (sensor, begin, end) => {
  const queryParams = `start=${begin}&end=${end}`;
  return Vue.http.get(`${document.location.origin}/api/v1/sensor/${encodeURIComponent(sensor)}/series?${queryParams}`)
    .then(measurementResponse => Promise.resolve(measurementResponse.body));
};

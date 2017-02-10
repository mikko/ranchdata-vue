import Vue from 'vue';

export const getSensors = () => Vue.http.get(`${document.location.origin}/api/v1/sensors`)
    .then(sensorResponse => Promise.resolve(sensorResponse.body));

export const getLatestMeasurements = sensorId => Vue.http.get(`${document.location.origin}/api/v1/measurements/latest/${sensorId}`)
  .then(measurementResponse => Promise.resolve(measurementResponse.body.value));

export const getRelevantJournalEntries = count => Vue.http.get(`${document.location.origin}/api/v1/journalentries/relevant/${count}`)
  .then(messagesResponse => Promise.resolve(messagesResponse.body));

export const getViews = () => Vue.http.get(`${document.location.origin}/api/v1/views`)
    .then(viewsResponse => Promise.resolve(viewsResponse.body));

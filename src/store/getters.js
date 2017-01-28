export const sensors = state => Object.keys(state.sensors).map(sKey => state.sensors[sKey]);

export const latestValue = state => state.sensors.map(s => s.latestValue);

export const weatherForecastItems = state => state.weatherForecastItems;

export const allMessages = state => state.messages;

export const sensors = state => Object.keys(state.sensors).map(sKey => state.sensors[sKey]);

export const latestValue = state => Object.keys(state.sensors).map(s => s.latestValue);

export const weatherForecastItems = state => state.weatherForecastItems;

// Blueprint
export const viewEditMode = state => state.view.internal.editMode;
export const blueprintDrawMode = state => state.view.internal.drawMode;
export const exteriorWalls = state => state.view.blueprint.exteriorWalls;
export const interiorWalls = state => state.view.blueprint.interiorWalls;

export const view = state => state.view;
export const viewSensors = state => state.view.sensors;

// Journal
export const journalAddMode = state => state.journal.addMode;
export const allMessages = state => state.journal.messages;

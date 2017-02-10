export const sensors = state => Object.keys(state.sensors).map(sKey => state.sensors[sKey]);

export const latestValue = state => Object.keys(state.sensors).map(s => s.latestValue);

export const weatherForecastItems = state => state.weatherForecastItems;


// Blueprint
export const blueprintEditMode = state => state.blueprint.editMode;
export const blueprint = state => state.blueprint.data;
export const exteriorWalls = state => state.blueprint.data.exteriorWalls;
export const interiorWalls = state => state.blueprint.data.interiorWalls;

// Journal
export const journalAddMode = state => state.journal.addMode;
export const allMessages = state => state.journal.messages;

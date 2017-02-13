import Vue from 'vue';
import * as actionUtil from '../util/actionUtil';

const pollFrequency = 60000;

export const initialize = ({ commit, getters }) => {
  actionUtil.getSensors({ commit, getters })
    .then(() => {
      actionUtil.refreshLatestMeasurements({ commit, getters });
      actionUtil.refreshViews({ commit, getters });
    });

  setInterval(() => {
    actionUtil.refreshLatestMeasurements({ commit, getters });
  }, pollFrequency);

  actionUtil.refreshRelevantJournalEntries({ commit });
  setInterval(() => {
    actionUtil.refreshRelevantJournalEntries({ commit });
  }, pollFrequency);
};

export const syncBlueprint = ({ getters }) => {
  const currentView = getters.view;
  Vue.http.post(`${document.location.origin}/api/v1/view`, {
    title: 'todo',
    viewData: currentView,
  });
};

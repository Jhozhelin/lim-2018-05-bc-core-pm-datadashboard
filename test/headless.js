global.window = global;
global.assert = require('chai').assert;

const fetchMock = require('fetch-mock');
fetchMock.mock('../data/cohorts.json', 200);
fetchMock.mock('../data/cohorts/lim-2018-03-pre-core-pw/progress.json', 200);
fetchMock.mock('../data/cohorts/lim-2018-03-pre-core-pw/users.json', 200);

global.fixtures = {
  cohorts: require('../data/cohorts.json'),
  progress: require('../data/cohorts/lim-2018-03-pre-core-pw/progress.json'),
  users: require('../data/cohorts/lim-2018-03-pre-core-pw/users.json'),
};

global.progressCohortData = window.progressCohortData; //Verificar sipasa tests solo con window.pro...
global.computeUsersStats = window.computeUsersStats

require('../src/data');
require('./data.spec.js');

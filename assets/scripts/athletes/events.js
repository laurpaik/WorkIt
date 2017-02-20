'use strict';

const api = require('./api.js');
const ui = require('./ui.js');
const store = require('../store');

const getFormFields = require('../../../lib/get-form-fields');

const onCreateAthlete = function (event) {
  event.preventDefault();

  let data = getFormFields(event.target);
  api.create(data)
    .then((response) => {
      store.athlete = response.athlete;
      console.log(store.athlete);
    })
    .then(ui.onCreateSuccess)
    .catch(ui.onError);
};

const onUpdateAthlete = function (event) {
  event.preventDefault();

  let data = getFormFields(event.target);
  api.update(store.user.id, data)
    .then(ui.onUpdateSuccess)
    .catch(ui.onError);
};

const addHandlers = () => {
  $('#edit-athlete').on('submit', onUpdateAthlete);
  $('#post-athlete').on('submit', onCreateAthlete);
};

module.exports = {
  onCreateAthlete,
  onUpdateAthlete,
  addHandlers,
};

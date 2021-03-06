'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');
const logEvents = require('../log/events');
const workoutEvents = require('../workout/events');

const store = require('../store');

const onSignUp = function (event) {
  event.preventDefault();

  let data = getFormFields(event.target);
  api.signUp(data)
    .then((response) => {
      store.athlete = response.athlete;
    })
    .then(ui.signUpSuccess)
    .catch(ui.emailFailure)
    ;
};

const onSignIn = function (event) {
  event.preventDefault();

  let data = getFormFields(event.target);

  api.signIn(data)
    .then((response) => {
      store.user = response.user;
      return store.user;
    })
    .then(ui.signInSuccess)
    .then(workoutEvents.onGetWorkouts)
    .then(logEvents.onShowLogs)
    .then(logEvents.onIndexLogs)
    .catch(ui.signInFailure)
    ;
};

const onChangePassword = function (event) {
  event.preventDefault();

  let data = getFormFields(event.target);

  api.changePassword(data)
    .then(ui.changePwSuccess)
    .catch(ui.changePwFailure)
    ;
};

const onSignOut = function (event) {
  event.preventDefault();

  api.signOut()
  .then(() => {
    delete store.user;
    return store;
  })
  .then(ui.success)
  .catch(ui.failure)
  ;
};

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#change-password').on('submit', onChangePassword);
  $('#sign-out').on('submit', onSignOut);
};

module.exports = {
  addHandlers,
  onSignIn,
};

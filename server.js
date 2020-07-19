'use strict';

const app = require('./src/app');

/**
 * Performs all the required tasks in order to start the application.
 *
 * @return {Promise} A promise that resolves with no value if
 * the bootstrap process was successful. Otherwise it is rejected
 * with the appropriate error.
 * */
const boot = async () => {
  app.listen(8000, () => console.log('App listening on port 8000'));
};

const errorMessage = 'Error while bootstraping the application';

boot().catch((error) => console.error(errorMessage, error));

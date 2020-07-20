'use strict';

const app = require('./src/app');
const db = require('./src/db');
const {env, port} = require('./src/config');

/**
 * Performs all the required tasks in order to start the application.
 *
 * @return {Promise} A promise that resolves with no value if
 * the bootstrap process was successful. Otherwise it is rejected
 * with the appropriate error.
 * */
const boot = async () => {
  console.log(`Starting app in [${env}] environment.`);
  await db.connect();
  app.listen(port, () => console.log(`App listening on port ${port}`));
};

const errorMessage = 'Error while bootstraping the application';

boot().catch((error) => console.error(errorMessage, error));

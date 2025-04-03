'use strict';

/** ******************************
 ********* Import All routes ***********
 ******************************* */
const v1Routes = [
  ...require('./userRoutes'),
  ...require('./todoRoute')
];

module.exports = v1Routes;

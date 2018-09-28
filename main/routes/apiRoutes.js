
'use strict';
module.exports = function(app) {
  var data = require('../controllers/apiController');

  // todoList Routes
  app.route('/getdata/:ID')
    .get(data.datatoJSON2);
  app.route('/getdata')
    .get(data.datatoJSON);
};



const TestController = require('../controllers/TestController.js');

module.exports = function(app){
    app.get('/api/test-koneksi', TestController.tes);
};
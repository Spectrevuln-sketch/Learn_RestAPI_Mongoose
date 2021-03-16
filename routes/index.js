var express = require('express');
var router = express.Router();
var RestAPI = require('../controllers/restapi')

/* GET home page. */
router.post('/api/save-data', RestAPI.GetAll);


/* Get Bolg Post */
router.get('/api/get-all-data', RestAPI.getBlog);
/* End Get Bolg Post */

/* Post Data User */
router.post('/api/save-user-data', RestAPI.AddNewUser);
/* End Post Data User */


module.exports = router;

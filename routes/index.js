var express = require('express');
var router = express.Router();
var RestAPI = require('../controllers/restapi')

/* GET home page. */
router.post('/api/save-data', RestAPI.PostBlog);

/* Post Data User */
router.post('/api/save-user-data', RestAPI.AddNewUser);
/* End Post Data User */

/* Get Author Post */
router.get('/api/get-user-name', RestAPI.getAuthor);
/* End Get Author Post */

/* Get User By Blog  */
router.get('/api/get-user-byblog/:id', RestAPI.getAuthorByBlog)
/* End Get User By Blog  */

/* Get Blog By Author  */
router.get('/api/get-blog-byuser/:id', RestAPI.getBlogByAuthor);
/* End Get Blog By Author  */


/* 
* If you a user and want to add new blog data 
*/
/* Add New Blog With A User */
router.post('/api/save-blog-with-user/:id', RestAPI.processDataWithUser);
/* End Add New Blog With A User */

module.exports = router;

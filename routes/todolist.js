var express = require('express');
var router = express.Router();

var todolist_controller = require('../controllers/todolistController');

router.get('/', todolist_controller.todo_get); 

router.get('/gettodolist', todolist_controller.gettodolist_get);

router.post('/', todolist_controller.todo_post);

module.exports = router;

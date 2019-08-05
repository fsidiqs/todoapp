var express = require('express');
var router = express.Router();

var todolist_controller = require('../controllers/todolistController');

router.get('/', todolist_controller.todo_get); 

router.post('/', todolist_controller.todo_post);

router.get('/gettodolist', todolist_controller.gettodolist_get);

router.put('/:id/update', todolist_controller.todo_update);

router.delete('/:id/delete', todolist_controller.todo_delete);

module.exports = router;

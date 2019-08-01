var express = require('express');
var router = express.Router();

var todolist_controller = require('../controllers/todolistController');

router.get('/', todolist_controller.index); 

module.exports = router;

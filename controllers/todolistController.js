var async = require('async');
var Todo = require('../models/todo');

exports.todo_get = function(req, res){
    const hostUrl = req.protocol + '://' + req.get('host');
    res.render('index', { title: 'Todo List', hostUrl:  hostUrl})
}

exports.gettodolist_get = function(req, res, next){
    Todo.find({})
    .exec(function(err, list_todo){
        if(err){ return next(err);}
        res.send(list_todo);
    });
}

exports.todo_post = [
    (req, res, next) => {

    }
]
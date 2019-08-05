var async = require('async');
var Todo = require('../models/todo');

const {
    body,
    sanitizeBody,
    validationResult
} = require('express-validator');

exports.todo_get = function (req, res) {

    const hostUrl = req.protocol + '://' + req.get('host');
    res.render('index', {
        title: 'Todo List',
        hostUrl: hostUrl
    })
}

exports.gettodolist_get = function (req, res, next) {
    Todo.find({})
        .exec(function (err, list_todo) {
            if (err) {
                return next(err);
            }
            res.send(list_todo);
        });
}

exports.todo_post = [
    body('todo.text', 'Todo must not be empty.').isLength({
        min: 1
    }).trim(),
    sanitizeBody('todo.text').escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.send(errors);
        } else {

            const todo = new Todo({
                text: req.body.todo.text,
                done: false
            });

            todo.save(function (err) {
                if (err) {
                    return next(err);
                }

                res.send(JSON.stringify('success'));

            });
        }
    }
]

exports.todo_update = [

    function (req, res, next) {
        Todo
            .findById(req.params.id)
            .exec(function (err, todo) {
                if (err) {
                    return next(err);
                }
                req.done = todo.done;
                next();
            });
    },

    function (req, res, next) {

      Todo
        .findByIdAndUpdate(req.params.id, {done: !req.done})
        .exec(function(err){
            if(err){return next(err);}
            res.send(JSON.stringify('success'));
        })
    }


]

exports.todo_delete = function(req, res, next){
    Todo.findByIdAndDelete(req.params.id)
        .exec(function(err){
            if(err){return next(err);}
            console.log(req.params.id)
            res.send(JSON.stringify('success'));
        })
}

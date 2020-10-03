const express = require('express');
const router = express.Router();
const userService = require('./../services/User');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
// router.get('/verify/:token',verify);

module.exports = router;


function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: '用户名和密码不匹配' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

// function verify(req,res,next){
//   userService.verifyToken(req.body)
//   .then(user => user ? res.json(user) : res.status(401).json({ message: 'verified token failed' }))
//   .catch(err => next(err));
// }

// function verify(req,res,next){
//     userService.verifyToken(req.params.token)
//     .then(result => res.send(result))
//     .catch(err => next(err));
//   }
const express = require('express');
const router = express.Router();
const projectService = require('./../services/Project');

router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/update', update);
router.delete('/:id', _delete);
router.post('/enable/:id',enable);
router.post('/disable/:id',disable);

module.exports = router;

function create(req, res, next){
    projectService.create(req.body)
    .then(message => res.json(message))
    .catch(err => next(err));
}

function getAll(req,res,next){
    projectService.getAll(req.query.category)
    .then(projects => res.json(projects))
    .catch(err => next(err));
}

function getById(req,res,next){
    projectService.getById(req.params.id)
    .then(projects=>res.json(projects))
    .catch(err=>next(err));
}

function update(req,res,next){
    projectService.updateById(req.body)
    .then(message => res.json(message))
    .catch(err=>next(err));
}

function _delete(req, res, next) {
    projectService.delete(req.params.id)
        .then(message => res.json(message))
        .catch(err => next(err));
}

function enable(req,res,next){
    projectService.enableWithId(req.params.id)
    .then(message=>res.json(message))
    .catch(err => next(err));
}

function disable(req,res,next){
    projectService.disableWithId(req.params.id)
    .then(message=>res.json(message))
    .catch(err=>next(err));
}

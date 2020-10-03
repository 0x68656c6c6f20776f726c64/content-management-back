const express = require('express');
const router = express.Router();
const formService = require('./../services/Forms');

router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/update', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next){
    formService.create(req.body)
    .then(message => res.json(message))
    .catch(err => next(err));
}

function getAll(req,res,next){
    formService.getAll(req.query.category)
    .then(forms => res.json(forms))
    .catch(err => next(err));
}

function getById(req,res,next){
    formService.getById(req.params.id)
    .then(forms=>res.json(forms))
    .catch(err=>next(err));
}

function update(req,res,next){
    formService.updateById(req.body)
    .then(forms => res.json(forms))
    .catch(err=>next(err));
}

function _delete(req, res, next) {
    formService.delete(req.params.id)
        .then(forms => res.json(forms))
        .catch(err => next(err));
}


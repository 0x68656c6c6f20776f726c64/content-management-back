const express = require('express');
const router = express.Router();
const submissionService = require('./../services/Submissions');

router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/update', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next){
    submissionService.create(req.body)
    .then(message => res.json(message))
    .catch(err => next(err));
}

function getAll(req,res,next){
    submissionService.getAll(req.query.category)
    .then(submission => res.json(submission))
    .catch(err => next(err));
}

function getById(req,res,next){
    submissionService.getById(req.params.id)
    .then(submission=>res.json(submission))
    .catch(err=>next(err));
}

function update(req,res,next){
    submissionService.updateById(req.body)
    .then(message => res.json(message))
    .catch(err=>next(err));
}

function _delete(req, res, next) {
    submissionService.delete(req.params.id)
        .then(message => res.json(message))
        .catch(err => next(err));
}

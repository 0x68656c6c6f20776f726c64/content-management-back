const express = require('express');
const router = express.Router();
const onlineEvaluationService = require('./../services/Online_evaluations');

router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/update', update);
router.delete('/:id', _delete);
router.post('/verify',verifyRelation);

module.exports = router;

function create(req, res, next){
    onlineEvaluationService.create(req.body)
    .then(message => res.json(message))
    .catch(err => next(err));
}

function getAll(req,res,next){
    onlineEvaluationService.getAll(req.query.category)
    .then(projects => res.json(projects))
    .catch(err => next(err));
}

function getById(req,res,next){
    onlineEvaluationService.getById(req.params.id)
    .then(projects=>res.json(projects))
    .catch(err=>next(err));
}

function update(req,res,next){
    onlineEvaluationService.updateById(req.body)
    .then(message => res.json(message))
    .catch(err=>next(err));
}

function _delete(req, res, next) {
    onlineEvaluationService.delete(req.params.id)
        .then(message => res.json(message))
        .catch(err => next(err));
}

function verifyRelation(req,res,next){
    onlineEvaluationService.verifyRelation(req.body)
        .then(result=>res.json({result}))
        .catch(err=>next(err));
}

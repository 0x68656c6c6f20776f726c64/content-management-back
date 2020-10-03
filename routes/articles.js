const express = require('express');
const router = express.Router();
const articleService = require('./../services/Articles');

router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/update', update);
router.delete('/:id', _delete);
router.post('/enable/:id',enable);
router.post('/disable/:id',disable);


module.exports = router;

function create(req, res, next){
    articleService.create(req.body)
    .then(message => res.json(message))
    .catch(err => next(err));
}

function getAll(req,res,next){
    articleService.getAll(req.query.category)
    .then(articles => res.json(articles))
    .catch(err => next(err));
}

function getById(req,res,next){
    articleService.getById(req.params.id)
    .then(articles=>res.json(articles))
    .catch(err=>next(err));
}

function update(req,res,next){
    articleService.updateById(req.body)
    .then(message => res.json(message))
    .catch(err=>next(err));
}

function _delete(req, res, next) {
    articleService.delete(req.params.id)
        .then(message => res.json(message))
        .catch(err => next(err));
}

function enable(req,res,next){
    articleService.enableWithId(req.params.id)
    .then(message=>res.json(message))
    .catch(err => next(err));
}

function disable(req,res,next){
    articleService.disableWithId(req.params.id)
    .then(message=>res.json(message))
    .catch(err=>next(err));
}

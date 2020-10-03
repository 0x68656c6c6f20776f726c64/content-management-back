const express = require('express');
const router = express.Router();
const projectCategoryService = require('../services/ProjectCategory');

router.get('/',getAllCategory);
router.get('/:key',getCategoryByKey);
router.post('/create',createCategory);
router.put('/update',updateCategory);
router.delete('/:key',_delete);

module.exports = router;

function getAllCategory(req,res,next){
    projectCategoryService.getAll()
    .then(category=>res.json(category))
    .catch(err=>next(err));
}

function getCategoryByKey(req,res,next){
    projectCategoryService.getByKey(req.params.key)
    .then(category=>res.json(category))
    .catch(err=>next(err));
}

function createCategory(req,res,next){
    projectCategoryService.create(req.body)
    .then(message=>res.json(message))
    .catch(err=>next(err));
}

function updateCategory(req,res,next){
    projectCategoryService.updateByKey(req.body)
    .then(message=>res.json(message))
    .catch(err=>next(err));
}

function _delete(req,res,next){
    projectCategoryService.delete(req.params.key)
    .then(message=>res.json(message))
    .catch(err=>next(err));
}
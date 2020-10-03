const express = require('express');
const router = express.Router();
const settingService = require('./../services/settings');

router.get('/', getAll);
router.put('/update', update);
router.post('/private_key',updatePrivateKey)
router.get('/private_key',getPrivateKey)
// router.get('/newsPageLimit',getNewsPageLimit)
// router.get('/caseDisplayRow',getCaseDisplayRow)

module.exports = router;


function getAll(req,res,next){
    settingService.getAll()
    .then(setting => res.json(setting))
    .catch(err => next(err));
}

function update(req,res,next){
    settingService.update(req.body)
    .then(message => res.json(message))
    .catch(err=>next(err));
}

function updatePrivateKey(req,res,next){
    settingService.updatePrivateKey(req.query.private_key)
    .then(message=>res.json(message))
    .catch(err=>next(err));
}

function getPrivateKey(req,res,next){
    settingService.getPrivateKey()
    .then(result => res.json(result))
    .catch(err=>next(err));
}

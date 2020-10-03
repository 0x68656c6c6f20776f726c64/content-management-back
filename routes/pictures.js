const express = require("express");
var router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { InsufficientStorage } = require("http-errors");
const fileService = require('./../services/File');
const Imagestorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.resolve(__dirname,'./../public/images'))
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname + '-' + req.query.fileId + path.extname(file.originalname))
    }
});

router.post('/upload', upload);
router.get('/:id', getById);
router.delete('/:id', _delete);

function getById(req,res,next)
{
    fileService.getById(req.params.id)
    .then(result=>{
        if(result)
        res.sendFile(result.path);
        else
        res.sendFile(path.resolve(__dirname,'./../public/images/image-default.png'));
    })
    .catch(err => next(err));
}


// put the HTML file containing your form in a directory named "public" (relative to where this script is located)
// router.get("/:fileId", (req,res)=>{
//     let folderName = req.params.folderName;
//     let fileName = req.params.fileName;
//     res.sendFile(path.join(__dirname,'./../assets/image/'+folderName+'/'+fileName));
// });

function upload(req,res,next)
{
    const upload = multer({
        storage:Imagestorage
    }).single('image')
    upload(req,res,(err)=>{
        if(err){
            res.json({
                message:err
            });
        }else{
            let fileParam = req.file;
            Object.assign(fileParam,{fileId:req.query.fileId});
            fileService.create(fileParam)
            .then(
                result=>res.json({result,fileParam})
            )
            .catch(err => 
                next(err)
            );
        }
    })   
}

function _delete(req,res,next)
{
    fileService.delete(req.params.id)
    .then(result=>res.json(result))
    .catch(err=>next(err));
}


module.exports = router;
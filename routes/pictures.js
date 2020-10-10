const express = require("express");
const api_url = require('./../appSettings.json').api_Url;
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
router.post('/content-image-upload',contentUpload);
// router.put('/update/:id',update);
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

function contentUpload(req,res,next){
    if(!req.query.id || !req.query.field)
    {
        res.json({error:{message:'Unable to fetch query: [id] or [field] in http request.'}})
        .catch(err => 
            next(err)
        );
    }
    const thisStorage= multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,path.resolve(__dirname,'./../public/images'))
        },
        filename:function(req,file,cb){
            const baseName = file.originalname.split('.');
            fileId = req.query.id+'-'+req.query.field+'-'+baseName[0] +'-'+Date.now();
            cb(null,file.fieldname +'-'+ fileId + path.extname(file.originalname))
        }
    });;
    var fileId;
    const upload = multer({
        storage:thisStorage
    }).single('upload')
    upload(req,res,(err)=>{
        if(err){
            res.json({
                message:err
            });
        }else{
            let fileParam = req.file;
            Object.assign(fileParam,{fileId:fileId});
            fileService.create(fileParam)
            .then(
                result=>{
                    if(result.message=='success')
                    {
                        res.json({
                            uploaded: 1,
                            fileName: fileParam.fileName,
                            url: api_url+'/pictures/'+fileId
                            //url: api_url+'/pictures/'+fileId
                            // resourceType: "Image",
                            // currentFolder: {
                            //     path: fileParam.path,
                            //     url: api_url+'/pictures/'+fileId,
                            //     acl: 255
                            // },
                            // fileName: fileParam.fileName,
                            // uploaded: 1
                        })
                    }
                    else
                    {
                        res.json({
                            error:{
                                message:result.message
                            }
                        })
                    }
                }
            )
            .catch(err => 
                next(err)
            );
        }
    });   
}

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
            if(req.query.status=='create')
            {
                fileService.create(fileParam)
                .then(
                    result=>res.json({result,fileParam})
                )
                .catch(err => 
                    next(err)
                );
            }
            else if(req.query.status=='update')
            {
                fileService.updateById(fileParam)
                .then(
                    result=>res.json({result,fileParam})
                )
                .catch(err => 
                    next(err)
                );
            }
            else
            {
                res.json({result:{message:'status error failed'},fileParam:null})
            }
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
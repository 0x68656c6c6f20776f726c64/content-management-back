const appsettings = require('./../appSettings.json');
const jwt = require('jsonwebtoken');
const db = require('./../helpers/db');
const fs = require('fs');
const File = db.File;
module.exports = {
    getAll,
    getById,
    updateById,
    create,
    delete: _delete
};

async function getAll()
{
    return await File.find({});
}

async function getById(id)
{
    return await File.findOne({fileId:id});
}

async function updateById(fileParam)
{
    const file = await File.findOne({ fileId:fileParam.fileId });
    if (!file) throw 'File not found';

    Object.assign(file,fileParam);

    await file.save();

    return {message:'success'};
}

async function create(fileParam)
{

    if(!await File.findOne({ fileId:fileParam.fileId }))
    {
         const file = new File(fileParam);
         await file.save();
         return {message:'success'};
    }
    else
    {
        return {message:'duplicate fileId'}
    }
}


async function _delete(id) {
    const file = await File.findOne({ fileId:id});
    if(!file) throw 'File not found';

    fs.unlink(file.path,(err)=>{
        if(err) throw err;
    });

    await file.deleteOne({fileId:id});

    return {message:'success'};
}
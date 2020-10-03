const appsettings = require('./../appSettings.json');
const jwt = require('jsonwebtoken');
const db = require('./../helpers/db');
const Project = db.Project;
const Online_evaluations = db.Online_evaluation;
module.exports = {
    getAll,
    getById,
    updateById,
    create,
    delete: _delete,
    enableWithId,
    disableWithId
};

async function getAll(cat)
{
    if(cat)
    {
        return await Project.find({category:cat}).select('projectId title subtitle category hot disabled image description');
    }
    else
    {
        return await Project.find().select('projectId title subtitle category hot disabled image description');
    }
}

async function getById(id)
{
    return await Project.findOne({projectId:id});
}

async function updateById(projectParam)
{
    const project = await Project.findOne({ projectId:projectParam.projectId });
    if (!project) throw 'Project not found';

    Object.assign(project,projectParam);

    await project.save();

    return {message:'success'};
}

async function create(projectParam)
{
    if (await Project.findOne({ projectId:projectParam.projectId })) {
        throw 'Duplicated projectId error';
    }

    const project = new Project(projectParam);
    await project.save();

    return {message:'success'};
}


async function _delete(id) {
    const project = await Project.findOne({ projectId:id});
    if(!project) throw 'Project not found';

    const relatedOe = await Online_evaluations.findOne({projectId:id})
    if(relatedOe) return{message:'Deletion failed: Has related Online_evaluation'}; 
    await Project.deleteOne({projectId:id});

    return {message:'success'};
}

async function enableWithId(id){
    var project =  await Project.findOne({ projectId:id });
    if(!project) throw 'Project not found';
    project.disabled = false;
    await project.save();
    return {message:'success'};
}


async function disableWithId(id){
    var project =  await Project.findOne({ projectId:id });
    if(!project) throw 'Project not found';
    project.disabled = true;
    await project.save();
    return {message:'success'};
}
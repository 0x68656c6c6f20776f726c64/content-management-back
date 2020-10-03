const appsettings = require('./../appSettings.json');
const jwt = require('jsonwebtoken');
const db = require('./../helpers/db');
const Projects_categories=db.Projects_categories;
const Project = db.Project;
module.exports = {
    getAll,
    getByKey,
    updateByKey,
    create,
    delete: _delete
};

async function getAll()
{
    return await Projects_categories.find();
}

async function getByKey(thisKey)
{
    return await Projects_categories.findOne({key:thisKey});
}

async function updateByKey(categoryParam)
{
    const category = await Projects_categories.findOne({key:categoryParam.key});
    if (!category) throw 'Category not found';

    // copy userParam properties to user
    Object.assign(category,categoryParam);

    await category.save();

    return {message:"success"};
}

async function create(categoryParam)
{
    if (await Projects_categories.findOne({ key:categoryParam.key })) {
        throw 'Duplicated category key error';
    }

    const category = new Projects_categories(categoryParam);
    // save user
    await category.save();

    return {message:'success'};
}


async function _delete(thisKey) {
    const relatedProject = await Project.find({category:thisKey}).select('projectId');
    if(relatedProject.length>0){
        var result = '';
        relatedProject.forEach(element => {
            result = result.concat(' ',element.projectId);
        });
        throw 'Delete Rejected: Exists ['+result+'] projects in this category';
    }

    const category = await Projects_categories.findOne({key:thisKey});
    if(!category) throw 'Projects category not found';

    await Projects_categories.deleteOne({key:thisKey});

    return {message:'success'};
}
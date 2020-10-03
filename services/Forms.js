const appsettings = require('./../appSettings.json');
const jwt = require('jsonwebtoken');
const db = require('./../helpers/db');
const Form = db.Form;
module.exports = {
    getAll,
    getById,
    updateById,
    create,
    delete: _delete
};

async function getAll()
{
    return await Form.find();
}

async function getById(id)
{
    return await Form.findOne({groupId:id});
}

async function updateById(formParam)
{
    const form = await Form.findOne({ groupId:formParam.groupId });
    if (!form) throw 'Form group not found';

    Object.assign(form,formParam);

    await form.save();

    return {message:'success'};
}

async function create(formParam)
{
    if (await Form.findOne({ groupId:formParam.groupId })) {
        throw 'Duplicated groupId error';
    }

    const form = new Form(formParam);
    await form.save();

    return {message:'success'};
}


async function _delete(id) {
    const form = await Form.findOne({ groupId:id});
    if(!form) throw 'Form not found';

    await form.deleteOne({groupId:id});

    return {message:'success'};
}
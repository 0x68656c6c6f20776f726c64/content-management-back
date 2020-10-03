const appsettings = require('./../appSettings.json');
const jwt = require('jsonwebtoken');
const db = require('./../helpers/db');
const Submissions =db.Submission;
module.exports = {
    getAll,
    getById,
    updateById,
    create,
    delete: _delete
};

async function getAll(key)
{
    return await Submissions.find();
}

async function getById(id)
{
    return await Submissions.findOne({submissionId:id});
}

async function updateById(submissionParam)
{
    const submission = await Submissions.findOne({submissionId:submissionParam.submissionId});
    if (!submission) throw 'Category not found';

    // copy userParam properties to user
    Object.assign(submission,submissionParam);

    await submission.save();

    return {message:"success"};
}

async function create(submissionParam)
{
    if (await Submissions.findOne({ submissionId:submissionParam.submissionId })) {
        throw 'Duplicated submission Id error';
    }

    const submission = new Submissions(categoryParam);
    // save user
    await submission.save();

    return {message:'success'};
}


async function _delete(id) {

    const submission = await Submissions.findOne({submissionId:id});
    if(!submission) throw 'Projects category not found';

    await Submissions.deleteOne({submissionId:id});

    return {message:'success'};
}
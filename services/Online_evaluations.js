const appsettings = require('./../appSettings.json');
const jwt = require('jsonwebtoken');
const db = require('./../helpers/db');
const { NotFound } = require('http-errors');
const Online_evaluations = db.Online_evaluation;
const Project = db.Project;
const Form = db.Form;
module.exports = {
    getAll,
    getById,
    updateById,
    create,
    delete: _delete,
    verifyRelation
};

async function getAll()
{
    return await Online_evaluations.find();
}

async function getById(id)
{
    return await Online_evaluations.findOne({evaluationId:id});
}

async function updateById(oeParam)
{
    const oe = await Online_evaluations.findOne({ evaluationId:oeParam.evaluationId });
    if (!oe) throw 'Online Evaluation not found';

    if (await verifyRelation(oeParam)!=1)
        throw 'Invalid Related Project or FormGroups error';

    
    const projectCheckIndex = await checkProjectId(oeParam.evaluationId, oeParam.projectId);

    if ((!oeParam.disable && projectCheckIndex==-1)) throw "Duplcated projectId with other active Online evaluation";

    Object.assign(oe,oeParam);

    await oe.save();

    return {message:'success'};
}

async function create(oeParam)
{
    if (await Online_evaluations.findOne({ evaluationId:oeParam.evaluationId })) {
        throw 'Duplicated evaluationId error';
    }

    if (! await Project.findOne({projectId:oeParam.projectId})) throw 'Invalid related project error';

    const oe = new Online_evaluations(oeParam);
    await oe.save();
    
    return {message:'success'};
}


async function _delete(id) {
    const oe = await Online_evaluations.findOne({ evaluationId:id});
    if(!oe) throw 'Online Evaluation not found';

    await oe.deleteOne({evaluationId:id});

    return {message:'success'};
}


// verify if online_evalution relation has corespondent projects and forms
// return values:{
//    -1: no related projects,
//    0: find related project but missing form groups or duplicate groupsId,
//    1: find every corespondent entities
// }
async function verifyRelation(oeParam)
{
    var result = 1;
    const oe = oeParam;
    if(await Project.findOne({projectId:oe.projectId}))
    {
        var mem = [];
        for(let i=0;i<oe.formGroupsId.length;i++)
        {
            let temp = await Form.findOne({groupId:oe.formGroupsId[i]});
            if(!temp || mem.includes(temp.groupId))
            {
                result = 0;
            }else
            {
                mem.push(temp.groupId);
            }
        }
        return result;
    }else
    {
        return -1;
    }
}

//check if projectId is valid
//input valuse {
//   eid:evaluationId,
//   pid:projectId,    
//}
//return values: {
//   -1: there is duplicate projectId and the disable field is false,
//    0: there is duplicate projectId but all objects disable field is true,
//    1: there is no duplicate projectId,
//}
async function checkProjectId(eid,pid)
{
    const oe = await Online_evaluations.find({projectId:pid});
    if(!oe)
    {
        return 1;
    }
    else
    {
        for(let i=0;i<oe.length;i++)
        {
            if(!oe[i].disable && oe[i].evaluationId!=eid)
            {
                return -1;
            }
        }
        return 0;
    }
}
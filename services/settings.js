const jwt = require('jsonwebtoken');
const db = require('./../helpers/db');
const fs = require('fs');
const Settings = db.Setting;
module.exports = {
    getAll,
    update,
    updatePrivateKey,
    getPrivateKey
};

async function getAll()
{
    return await Settings.findOne({});
}

async function update(settingParam)
{
    const setting = await Settings.findOne({});
    if (!setting) throw 'Setting object error';

    Object.assign(setting,settingParam);

    await setting.save();

    return {message:'success'};
}


async function updatePrivateKey(newKey)
{
    fs.readFile('./../appSettings.json','utf-8',function(err,data){
        if(err) throw err;
        var newData = JSON.parse(data);
        newData.security.private_key = newKey;

        fs.writeFile('./../appSettings.json',JSON.stringify(newData),function(err){
            if(err) throw err;
        })
    });
    return {message:'sucess'};
}

async function getPrivateKey()
{
    var data = await fs.readFileSync('./../appSettings.json');
    var result = JSON.parse(data.toString()).security.private_key;
    return result;
}
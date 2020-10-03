const appsettings = require('./../appSettings.json');
const databaseName = appsettings.database.database_name;
const collectionName = appsettings.database.user_collection_name;
const jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
const db = require('./../helpers/db');
const User = db.User;
module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    verifyToken
};
async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && passwordHash.verify(password, user.password)) {
        const token = jwt.sign({ exp:Math.floor(Date.now() / 1000) + (60 * 60),sub: user.id }, appsettings.security.secret_key);
        return {
            ...user.toJSON(),
            token
        };
    }
}

// async function verifyToken({token}){
//     var id;
//     jwt.verify(token,appsettings.security.secret_key,function(err,decoded){
//         if(!err)
//         {
//             id = decoded.sub;
//         }
//     });
//     if(id!='undefined')
//     {
//         return await User.findById(id);
//     }
// }

async function verifyToken(token){
    var id;
    if(token==undefined)
    {
        return {message:'fail'};
    }
    jwt.verify(token,appsettings.security.secret_key,function(err,decoded){
        if(!err)
        {
            id = decoded.sub;
        }
    });
    var user = await User.findById(id);
    if(user && parseInt(user.role)>1)
    {
        return {message:'success'};
    }else
    {
        return {message:'fail'};
    }
}

async function getAll() {
    return await User.find();
}

async function getById(id) {
    return await User.findById(id);
}

async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.password = passwordHash.generate(userParam.password);
    }

    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.password = passwordHash.generate(userParam.password);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}
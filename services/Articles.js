const appsettings = require('./../appSettings.json');
const jwt = require('jsonwebtoken');
const db = require('./../helpers/db');
const Article = db.Article;
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
        return await Article.find({category:cat}).select('articleId title subtitle category disabled image description');
    }
    else
    {
        return await Article.find().select('articleId title subtitle category disabled image description');
    }
}

async function getById(id)
{
    return await Article.findOne({articleId:id});
}

async function enableWithId(id){
    var article =  await Article.findOne({ articleId:id });
    if(!article) throw 'Article not found';
    article.disabled = false;
    await article.save();
    return {message:'success'};
}

async function disableWithId(id){
    var article =  await Article.findOne({ articleId:id });
    if(!article) throw 'Article not found';
    article.disabled = true;
    await article.save();
    return {message:'success'};
}

async function updateById(articleParam)
{
    const article = await Article.findOne({ articleId:articleParam.articleId });
    if (!article) throw 'Article not found';

    Object.assign(article,articleParam);

    await article.save();

    return {message:'success'};
}

async function create(articleParam)
{
    if (await Article.findOne({ articleId:articleParam.articleId })) {
        throw 'Duplicated articleId error';
    }

    const article = new Article(articleParam);
    await article.save();

    return {message:'success'};
}


async function _delete(id) {
    const article = await Article.findOne({ articleId:id});
    if(!article) throw 'Article not found';

    await article.deleteOne({articleId:id});

    return {message:'success'};
}
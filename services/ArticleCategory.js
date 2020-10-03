const appsettings = require('./../appSettings.json');
const jwt = require('jsonwebtoken');
const db = require('./../helpers/db');
const Articles_categories =db.Articles_categories;
const Article = db.Article;
module.exports = {
    getAll,
    getByKey,
    updateByKey,
    create,
    delete: _delete
};

async function getAll(key)
{
    return await Articles_categories.find();
}

async function getByKey(thisKey)
{
    return await Articles_categories.findOne({key:thisKey});
}

async function updateByKey(categoryParam)
{
    const category = await Articles_categories.findOne({key:categoryParam.key});
    if (!category) throw 'Category not found';

    Object.assign(category,categoryParam);

    await category.save();

    return {message:"success"};
}

async function create(categoryParam)
{
    if (await Articles_categories.findOne({ key:categoryParam.key })) {
        throw 'Duplicated category key error';
    }

    const category = new Articles_categories(categoryParam);
    await category.save();

    return {message:'success'};
}


async function _delete(thisKey) {
    const relatedArticle = await Article.find({category:thisKey}).select('articleId');
    if(relatedArticle.length>0){
        var result = '';
        relatedArticle.forEach(element => {
            result = result.concat(' ',element.articleId);
        });
        throw 'Delete Rejected: Exists ['+result+'] articles in this category';
    }

    const category = await Articles_categories.findOne({key:thisKey});
    if(!category) throw 'articles category not found';

    await Articles_categories.deleteOne({key:thisKey});

    return {message:'success'};
}
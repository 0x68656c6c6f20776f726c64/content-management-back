const mongoose = require('mongoose');
const appSettings = require('./../appSettings.json');
const {RequestHeaderFieldsTooLarge} = require('http-errors');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(appSettings.database.mongo_uri);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('./../models/user.model'),
    Project:require('./../models/project.model'),
    Projects_categories:require('./../models/projects_categories.model'),
    Article:require('./../models/articles.model'),
    Articles_categories:require('./../models/articles_categories.model'),
    Form:require('./../models/forms.model'),
    Online_evaluation:require('./../models/online_evaluations.model'),
    Submission:require('./../models/submissions.model'),
    Setting:require('./../models/settings.model'),
    File:require('./../models/files.model')
};
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./helpers/error-handler');

//const projectService = require('./services/Project');
//const userService = require('./services/User');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());




// api routes
app.use('/api/users', require('./routes/users'));
app.use('/api/projects',require('./routes/projects'));
app.use('/api/projects_categories',require('./routes/projects_categories'));
app.use('/api/articles',require('./routes/articles'));
app.use('/api/articles_categories',require('./routes/articles_categories'));
app.use('/api/online_evaluations',require('./routes/online_evaluations'));
app.use('/api/forms',require('./routes/forms'));
app.use('/api/submissions',require('./routes/submissions'));
app.use('/api/settings',require('./routes/settings'));
app.use('/api/pictures',require('./routes/pictures'))
//projectService.getAllTitles().then(result=>{console.log(result)});
// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});


module.exports = app;
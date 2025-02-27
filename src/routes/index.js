const newsRouter = require('./news');
const sitesRouter = require('./sites');
const songsRouter = require('./song');
const meRouter = require('./me');


function route(app){
    app.use('/news', newsRouter);
    app.use('/song', songsRouter);
    app.use('/me', meRouter);
    app.use('/', sitesRouter);
}

module.exports = route;

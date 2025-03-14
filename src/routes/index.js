const newsRouter = require('./news');
const sitesRouter = require('./sites');
const songsRouter = require('./song');
const meRouter = require('./me');
const authRouter = require('./auth');


function route(app){
    app.use('/news', newsRouter);
    app.use('/song', songsRouter);
    app.use('/me', meRouter);
    app.use('/auth', authRouter);
    app.use('/', sitesRouter);
}

module.exports = route;


const Song = require('../models/song');

class MeController{

    // GET show 
    async show(req, res, next){
        try {
            const data = await Song.find({}).lean();
            res.render('me/mySong', { data });
        } catch (error) {
            next(error);
        }
    }

    // [GET]
    async deletedSongList(req, res, next){
        try {
            const data = await Song.findWithDeleted({ deleted: true }).lean();
            const dataBinCount = await Song.countDocumentsWithDeleted({ deleted: true}).lean(); 
            res.render('me/deletedSongList', { data, dataBinCount});
        } catch (error) {
            next(error);
        }
    }
    // [PATH] Restore
    async restoreSongList(req, res, next){
        try {
            await Song.restore({ slug: req.params.slug }).lean();
            res.redirect('back');
        } catch (error) {
            next(error);
        }
    }

    // [DELETE]
    async hardDelete(req, res, next){
        try {
            await Song.findOneAndDelete({slug: req.params.slug }).lean();
            res.redirect('back');
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new MeController;
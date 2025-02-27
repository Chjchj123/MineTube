
const Song = require('../models/song');

class SongsController{

    // GET show 
    async show(req, res, next){
        try {
            const data = await Song.findOne({ slug: req.params.slug}).lean();
            res.render('song', { data });
        } catch (error) {
            next(error);
        }
    }

    // [GET]
    adminShow(req, res){
        res.render('admin/admin');
    }

    // [POST]
    store(req, res, next){
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg?sqp=-oaymwFACKgBEF5IWvKriqkDMwgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAHwAQH4Af4JgALQBYoCDAgAEAEYciBNKD4wDw==&rs=AOn4CLC1oj0KCXYtzfNW-C8DICMkqi6GCg`
        const songs = new Song(req.body)
        songs.save()
            .then(() => res.redirect('/'))
            .catch(error =>{
                next(error);
            })
    }

    // [GET]
    async updateSong(req, res, next){
        try {
            const data = await Song.findOne({ slug: req.params.slug}).lean();
            res.render(`admin/updateSong`, { data });
        } catch (error) {
            next(error);
        }
    }

    // [PUT]
    async updated(req, res, next){
        try {
            const formData = req.body;
            formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg?sqp=-oaymwFACKgBEF5IWvKriqkDMwgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAHwAQH4Af4JgALQBYoCDAgAEAEYciBNKD4wDw==&rs=AOn4CLC1oj0KCXYtzfNW-C8DICMkqi6GCg`
            await Song.updateOne( { slug: req.params.slug } , req.body);
        } catch (error) {
            next(error);
        }
    }

    // [DELETE]
    async deleteSong(req, res, next){
        try {
            await Song.delete({ slug: req.params.slug });
            res.redirect('/');
        } catch (error) {
            next(error);
        }
    }

    //[POST]
    async handleFormActions(req, res, next){
        try {
            switch(req.body.action){
                case 'restore':
                    await Song.restore({slug: {$in: req.body.songSlugs} }).lean();
                    res.redirect('back');
                    break;
                case 'delete':
                    await Song.deleteMany({slug: {$in: req.body.songSlugs} }).lean();
                    res.redirect('back');
                    break;
                default:
                    res.json({message: "invalid action"});
                    break;
            }
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new SongsController;
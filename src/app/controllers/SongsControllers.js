
const Song = require('../models/song');
const User = require('../models/users');
const jwt = require('jsonwebtoken');

class SongsController{

    // GET show 
    async show(req, res, next){
        try {
            const data = await Song.findOne({ slug: req.params.slug}).lean();
            const nextVideo = await Song.findOne({ _id: { $gt: data._id } }).lean();
            const refreshToken = req.cookies.refreshToken;
            var userId;
            
            jwt.verify(refreshToken, "dqa20062004", (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: "Invalid refresh token" });
                }
                userId = decoded.id;
            });
            const user = await User.findOne({ _id: userId}).lean();

            res.render('song', { data, nextVideo, user});
        } catch (error) {
            next(error);
        }
    }

    // [GET]
    async adminShow(req, res){
        const refreshToken = req.cookies.refreshToken;
        var userId;
        jwt.verify(refreshToken, "dqa20062004", (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid refresh token" });
            }
            userId = decoded.id;
        });
        const user = await User.findOne({ _id: userId}).lean();
        res.render('admin/admin', {user});
    }

    // [POST]
    async store(req, res, next){
        const refreshToken = req.cookies.refreshToken;
        var userId;
            jwt.verify(refreshToken, "dqa20062004", (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: "Invalid refresh token" });
                }
                userId = decoded.id;
            });
        const user = await User.findOne({ _id: userId}).lean();

        
        const formData = req.body;
        formData.uploadBy = user.username;
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
            const refreshToken = req.cookies.refreshToken;
            var userId;
            jwt.verify(refreshToken, "dqa20062004", (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: "Invalid refresh token" });
                }
                userId = decoded.id;
            });
            const user = await User.findOne({ _id: userId}).lean();
            const data = await Song.findOne({ slug: req.params.slug}).lean();
            if(user.username === data.uploadBy){
                res.render(`admin/updateSong`, { data , user});
            }else{
                res.status(200).json("This is not your song you upload!");
            }
            
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
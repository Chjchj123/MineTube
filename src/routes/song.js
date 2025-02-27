const express = require('express');
const router = express.Router();

const songsController = require('../app/controllers/SongsControllers');

router.get('/admin-show', songsController.adminShow);
router.get('/update-song/:slug', songsController.updateSong);
router.post('/handle-form-action', songsController.handleFormActions);
router.post('/store', songsController.store);
router.put('/update/:slug', songsController.updated);
router.delete('/delete/:slug', songsController.deleteSong);
router.get('/:slug', songsController.show);
module.exports = router;
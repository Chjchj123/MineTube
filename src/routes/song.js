const express = require('express');
const router = express.Router();

const songsController = require('../app/controllers/SongsControllers');
const middlewareController = require('../app/controllers/MiddlewareController');

router.get('/admin-show',middlewareController.verifyToken, songsController.adminShow);
router.get('/update-song/:slug',middlewareController.verifyToken, songsController.updateSong);
router.post('/handle-form-action',middlewareController.verifyToken, songsController.handleFormActions);
router.post('/store',middlewareController.verifyToken, songsController.store);
router.put('/update/:slug',middlewareController.verifyToken, songsController.updated);
router.delete('/delete/:slug',middlewareController.verifyToken, songsController.deleteSong);
router.get('/:slug',middlewareController.verifyToken, songsController.show);
module.exports = router;
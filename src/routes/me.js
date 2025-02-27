const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/my-song', meController.show);
router.get('/deleted-song', meController.deletedSongList);
router.patch('/restore/:slug', meController.restoreSongList);
router.delete('/hard-delete/:slug', meController.hardDelete);
module.exports = router;
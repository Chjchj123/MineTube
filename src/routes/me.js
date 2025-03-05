const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const meController = require('../app/controllers/MeController');
const middlewareController = require('../app/controllers/MiddlewareController');
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.get('/my-song',middlewareController.verifyToken, meController.show);
router.get('/deleted-song',middlewareController.verifyToken, meController.deletedSongList);
router.patch('/restore/:slug',middlewareController.verifyToken, meController.restoreSongList);
router.delete('/hard-delete/:slug',middlewareController.verifyToken, meController.hardDelete);
router.get('/your-profile/:slug', middlewareController.verifyToken, meController.getProfile);
router.post("/upload-avatar", upload.single("avatar"), meController.updateAvatar);
router.get('/profile/:slug',middlewareController.verifyToken, meController.showProfile);
router.get('/edit-profile/:_id',middlewareController.verifyToken, meController.editProfile);
router.put('/updated-profile/:_id', middlewareController.verifyToken, meController.updatedProfile);
module.exports = router;
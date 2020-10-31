const express = require( 'express' );

const { authenticate } = require('../../utils/auth');
const { checkOldPassword } = require('../../utils/auth');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname,'../../../','src','public','profile-images'));
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, req.query.email+'.jpg');
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

const { 
    uploadData
} = require( '../../controllers/upload' );
const { dirname } = require('path');

const router = express.Router();

router.post( '/' , authenticate, upload.single('image'), checkOldPassword, uploadData );

module.exports = router;
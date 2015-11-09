var express = require('express');
var router = express.Router();
var Photos = require('../models/photos.js');

/* GET home page. */
router.get('/', function(req, res) {
	Photos.find({}, null, {
        sort: {
            updated_at: -1
        }
    }, function(err, photos) {
        if (err)
            res.render('error');
        else
            res.render('index', {
                title: 'Jins Photoshop',
                photos: photos,
            });
    });
});

module.exports = router;

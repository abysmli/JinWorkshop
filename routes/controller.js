var express = require('express');
var router = express.Router();
var auth = require('../models/auth.js');
var Photos = require('../models/photos.js');
var setting = require('../setting.js');

router.get('/', function(req, res, next) {
    Photos.find({}, null, {
        sort: {
            updated_at: -1
        }
    }, function(err, photos) {
        if (err)
            res.render('error');
        else
            res.render('controller/index', {
                title: 'Photos Manage',
                photos: photos,
                layout: 'controller/layout'
            });
    });
});

router.get('/photos/add', function(req, res, next) {
    res.render('controller/photo_form', {
        title: 'Add Photo',
        photo: "",
        layout: 'controller/layout'
    });
});

router.post('/photos/add', function(req, res, next) {
    var photo = {
        PhotoTitle: req.body.Title,
        PhotoTag: req.body.Tag,
        PhotoString: req.body.image[1],
        PhotoThumbString: req.body.imageThumb[1]
    }
    Photos.create(photo, function(err, photo) {
        if (err) return res.render('error');
        return res.redirect('/controller/');
    });
});

router.get('/photos/edit', function(req, res, next) {
    Photos.findById(req.query.id, function(err, photo) {
        if (err) res.render('error');
        else {
            res.render('controller/photo_form', {
                title: 'Edit Photo',
                photo: photo,
                layout: 'controller/layout'
            });
        }
    });
});

router.post('/photos/edit', function(req, res, next) {
    var photo = {
        PhotoTitle: req.body.Title,
        PhotoTag: req.body.Tag
    }
    if (req.body.image !== "{}") {
        photo.PhotoString = req.body.image[1]
    }
    if (req.body.imageThumb !== "{}") {
        photo.PhotoThumbString = req.body.imageThumb[1]
    }
    Photos.findOneAndUpdate({_id: req.query.id}, photo, function(err, photo) {
        if (err) res.render('error');
        else {
            return res.redirect('/controller/');
        }
    });
});

router.get('/photos/remove', function(req, res, next) {
    Photos.findByIdAndRemove(req.query.id, function(err, photo) {
        if (err) res.render('error');
        else {
            return res.redirect('/controller/');
        }
    });
});

router.get('/photos/remove_all', function(req, res, next) {
    Photos.remove(function(err) {
        if (err)
            res.render('error');
        else
            res.redirect('/controller/');
    });
});

module.exports = router;
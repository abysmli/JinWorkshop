var mongoose = require('mongoose');
var setting = require('../setting.js');
mongoose.connect('mongodb://localhost/'+setting.database);

var PhotosSchema = new mongoose.Schema({
    PhotoTitle: String,
    PhotoTag: String,
    PhotoString: String,
    PhotoThumbString: String,
	updated_at: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Photos', PhotosSchema);

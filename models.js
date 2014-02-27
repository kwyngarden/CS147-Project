var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var HallSchema = new Schema({
  // fields are defined here
  'name': String,
  'latitude': Number,
  'longitude': Number,
  'hours': Schema.Types.Mixed,
  'imageURL': String,
  'menu': [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }]
});

var MenuItemSchema = new Schema({
	'name': String,
	'imageURL': String,
	'upvotes': Number,
	'downvotes': Number,
	'dining_hall': String,
	'nutritional_info': String,
	'favorites': Number,
	'upvoters': [{ type: Schema.Types.ObjectId, ref: "User"}],
	'downvoters': [{ type: Schema.Types.ObjectId, ref: "User"}],
	'tags': [String]
});

var UserSchema = new Schema({
	'username': String,
	//'password': String,
	'favorites': [{ type: Schema.Types.ObjectId, ref: "MenuItem"}]
});

exports.Hall = Mongoose.model('Hall', HallSchema);
exports.MenuItem = Mongoose.model('MenuItem', MenuItemSchema);
exports.User = Mongoose.model('User', UserSchema);
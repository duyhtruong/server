const mongoose = require('mongoose');
//const Scheme = mongoose.Schema; 
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String
});

mongoose.model('users', userSchema);
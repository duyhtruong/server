const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done)=>{
	done(null,user.id);
});

passport.deserializeUser((id, done)=>{
	User.findById(id)
		.then(user => {
			done(null, user);
		});
});


//passport use this new strategy
passport.use(new GoogleStrategy({
	clientID: keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	callbackURL: '/auth/google/callback',
	userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
	proxy: true
}, async (accessToken, refreshToken, profile, done) => {
	const existingUser = await User.findOne({ googleId: profile.id })
		if (existingUser) {
				// already have record with profile id
				done(null, existingUser);
			} else {
				//we dont have a user record make new record
				const user = await new User({ googleId:profile.id}).save()
				done(null, user);
			}
		})

	
);
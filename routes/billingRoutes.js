const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
	app.post('/api/stripe', async (req,res) => {
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '$5 for 5 credits',
			source: req.body.id
		})
		//set up automatically by passport
		//current user model
		req.user.credits += 5;
		const user = await req.user.save(); 

		res.send(user);
	});
};
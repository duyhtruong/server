//importing express
const express = require('express');

const app = express();


//route handler
app.get('/',(req, res) =>{
	res.send({hi: 'there'});
});

//heroku port process.env from heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT);
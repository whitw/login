const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const loginService = require('./src/service/loginService');
const app = express();
const loginApp = new loginService();

const PORT = 8080;

app.use('/', express.static('view'));
app.use(bodyParser.urlencoded({extended: false}));

app.post('/login', (req, res)=>{
    const id = console.log(req.body.id);
	const pw = console.log(req.body.pw);
	if(loginApp.signin(id, pw).result === true){
		
	}
	else{
		
	}
	res.redirect('/');
});

app.listen(PORT, ()=>console.log(`Server listening on port ${PORT}`));

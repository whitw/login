const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const loginService = require('./src/service/loginService');
const app = express();
const loginApp = new loginService();
const session = require('./src/service/sessionService');
const PORT = 8082;

app.use('/', express.static('public'));
app.use(session);
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/auth/check', async(req, res)=>{
	if(req.session.user_id)
		return res.status(200).json({id: req.session.user_id});
	else
		return res.status(200).json({id: null, message: "Please sign in first!"});
});

app.post('/auth/login', async (req, res)=>{
	if(req.session.user_id){
		return res.status(200).json({message: `Already Signed In: ${req.session.user_id}`});
	}
	const id = req.body.id;
	const pw = req.body.password;
	console.log(id, pw);
	if(!id || !pw){
		return res.status(400).json({message: 'Invalid requests'});
	}
	const loginResult = await loginApp.signin(id, pw);
	if(loginResult.result){
		req.session.user_id = id;
		return res.status(200).json({message: 'OK'});
	}
	else{
		return res.status(401).json({message: loginResult.message});
	}
});

app.post('/auth/signup', async (req, res)=>{
	const id = req.body.id;
	const pw = req.body.password;
	const email = req.body.email;
	const nickname = req.body.nickname;
	if(!id || !pw || !email || !nickname){
		return res.status(400).json({message: "Invalid requests"});
	}
	const signUpResult = await loginApp.signup(id, pw, email, nickname);
	return res.status(200).json(signUpResult);
});

app.post('/auth/signout', async(req, res)=>{
	req.session.destroy((err)=>{
		if(err) throw err;
		res.status(200).json({message: "OK"});
	})
})

app.listen(PORT, ()=>console.log(`Server listening on port ${PORT}`));

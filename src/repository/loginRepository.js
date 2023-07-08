const LoginResult = require('../dto/loginResult');

class LoginRepository{
	constructor(){
		if(new.target == LoginRepository){
			throw new TypeError("Cannot construct abstract class LoginRepository");
		}
	}

};

module.exports = LoginRepository;

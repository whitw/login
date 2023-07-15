const LoginRepository = require('../repository/loginDatabaseRepository');
const LoginResult = require('../data/loginResult');
const EncryptService = require('./encryptService');

class LoginService {
	constructor(){
		this.loginRepository = new LoginRepository();
		this.encryptService = new EncryptService();
	}
	async signin(id, password){
		const userInfo = await this.loginRepository.getUserById(id);
		if(userInfo === null){
			await this.encryptService.getHashedPassword('time', 'consuming...');
			return new LoginResult(false, "User id or password does not match.");
		}
		const salt = userInfo.salt;
		const hashedPw = userInfo.hashedPw;
		const challenge = await this.encryptService.getHashedPassword(password, salt);
		if(hashedPw === challenge){
			return new LoginResult(true, `Hello ${userInfo.nickname}!`);
		}
		else{
			return new LoginResult(false, "User id or password does not match.");
		}
	}
	async signup(id, password, email, nickname){
		const userIdInfo = await this.loginRepository.getUserById(id);
		if(userIdInfo !== null){
			return new LoginResult(false, "ID already exists");
		}
		const userEmailInfo = await this.loginRepository.getUserByEmail(email);
		if(userEmailInfo !== null){
			return new LoginResult(false, "Email already exists");
		}
		const userNicknameInfo = await this.loginRepository.getUserByNickname(nickname);
		if(userNicknameInfo !== null){
			return new LoginResult(false, "Nickname already exists");
		}
		const salt = await this.encryptService.getSalt();
		const hashedPw = await this.encryptService.getHashedPassword(password, salt);
		this.loginRepository.insertUser(id, salt, hashedPw, email, nickname);
		return new LoginResult(true, `Welcome ${nickname}!`);
	}
}

module.exports = LoginService;

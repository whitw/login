const LoginRepository = require('./loginRepository');
const LoginResult = require('../dto/loginResult');
const db = require('./conn');

class LoginDatabaseRepository extends LoginRepository{
	constructor(){
		super();
	}

	async getUserById(id){
		try{
			const conn = await db.getConnection();
			const sql = "SELECT * FROM tb_user WHERE id = ?";
			const params = [id];
			const [rows, fields] = await conn.execute(sql, params);
			conn.release();
			if(rows.length === 0){
				return null;
			}
			return rows[0];
		} catch(err){
			throw err;
		}
	}
	
	async getUserByEmail(email){
		try{
			const conn = await db.getConnection();
			const sql = "SELECT * FROM tb_user WHERE email= ?";
			const params = [email];
			const [rows, fields] = await conn.execute(sql, params);
			conn.release();
			if(rows.length === 0){
				return null;
			}
			return rows[0];
		} catch(err){
			throw err;
		}
	}

	async getUserByNickname(nickname){
		try{
			const conn = await db.getConnection();
			const sql = "SELECT * FROM tb_user WHERE nickname = ?";
			const params = [nickname];
			const [rows, fields] = await conn.execute(sql, params);
			conn.release();
			if(rows.length === 0){
				return null;
			}
			return rows[0];
		} catch(err){
			throw err;
		}
	}

	async insertUser(id, salt, hashedPw, email, nickname){
		let conn;
		const sql = "INSERT INTO tb_user(id, salt, hashedPw, email, nickname) VALUES (?, ?, ?, ?, ?)";
		const params = [id, salt, hashedPw, email, nickname];
		try{
			conn = await db.getConnection();
		} catch(err){
			throw err;
		}
		try{
			await conn.execute(sql, params);
			conn.release();
		} catch(err){
			console.error(err);
		}
		return true;
	}
	async deleteUserById(id){
		try{
			const conn = await db.getConnection();
			const sql = "DROP FROM tb_user WHER id = ?";
			const params = [id];
			const [rows, fields] = await conn.execute(sql, params);
		} catch(err){
			throw err;
		}
	}
};

module.exports = LoginDatabaseRepository;

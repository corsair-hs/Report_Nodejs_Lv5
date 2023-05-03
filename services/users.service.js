// Method -> Process -> Request) Repository -> Response Data to Controller

const UsersRepository = require('../repositories/users.repository.js');
const JWT = require('jsonwebtoken');

class UsersService {
  usersRepository = new UsersRepository();

  // Find Member with nickname
  getUserWithNickname = async (nickname) => {
    try {
      const getUser = await this.usersRepository.getUserWithNickname(nickname);
      return getUser;
    } catch (err) {
      console.error(err);
      return null;
    }

  };

  // Join in
  signup = async (nickname, password) => {
    try {
      const addUser = await this.usersRepository.addUser(nickname, password);
      return { message: "회원 가입에 성공하였습니다." }
    } catch (err) {
      console.error(err);
      return { errorMessage: "회원 가입에 실패하였습니다." }
    }
  };

  // log in
  login = async (nickname, password) => {
    try {
      // Find Member's userId with nickname
      const getUser = await this.usersRepository.getUserWithNickname(nickname);
      // JWT create
      const token = JWT.sign({ userId: getUser.userId }, "customized_secret_key");
      return { token }
    } catch (err) {
      console.error(err);
      return { errorMessage: "로그인에 실패하였습니다."};
    }
  };

};

module.exports = UsersService;
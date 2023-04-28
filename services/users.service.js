// Method -> Process -> Request) Repository -> Response Data to Controller

const UsersRepository = require('../repositories/users.repository.js');
const JWT = require('jsonwebtoken');

class UsersService {
  usersRepository = new UsersRepository();

  // 회원가입
  signup = async (nickname, password, confirm) => {
    // 닉네임 중복 검증
    const getUser = await this.usersRepository.getUserWithNickname(nickname);
    if (getUser) {
      return { num: 412, msg: "중복된 닉네임입니다." };
    }
    // 닉네임 최소 3글자 이상, 알파벳 대소문자, 숫자 외 에러메세지
    if ((!/^[a-zA-Z0-9]+$/.test(nickname)) || (nickname.length < 4)) {
      return { num: 412, msg: "닉네임의 형식이 일치하지 않습니다." };
    };
    // 패스워드, 확인패스워드 일치 검증
    if (password !== confirm) {
      return { num: 412, msg: "패스워드가 일치하지 않습니다." };
    };
    // 패스워드 닉네임을 포함시키면 에러메세지
    if (password.includes(nickname)) {
      return { num: 412, msg: "패스워드에 닉네임이 포함되어 있습니다." };
    };
    // 패스워드 4글자 이하이면 에러메세지 
    if (password.length <= 4) {
      return { num: 412, msg: "패스워드 형식이 일치하지 않습니다." };
    };
    // 검증 모두 OK ? 회원저장
    await this.usersRepository.addUser(nickname, password);
    return { num: 200, msg: "회원 가입에 성공하였습니다." };
  };

  // 로그인
  login = async (nickname, password) => {
    // 회원 검증
    const getUser = await this.usersRepository.getUserWithNickname(nickname);
    if (!getUser || getUser.password !== password) {
      return { num: 401, msg: "닉네임 또는 패스워드를 확인해주세요." };
    };
    // JWT 생성
    const token = JWT.sign({userId: getUser.userId}, "customized_secret_key");
    return { num: 200, msg: token };
  };

};

module.exports = UsersService;
// Method -> Input Data Check (try-catch) -> Request) Service.Method -> Response) Message/Data to Client 

const UsersService = require('../services/users.service.js');

class UsersController {
  usersService = new UsersService();

  // 회원가입
  signup = async (req, res) => {
    try {
      // 1. 데이터 입력받기
      const { nickname, password, confirm } = req.body;
      // 1. 예외처리
      // 1-1. 닉네임 중복 검증
      const getUser = await this.usersService.getUserWithNickname(nickname);
      if (getUser) {
        return res.status(412).json({ errorMessage: "중복된 닉네임입니다." });
      }
      // 1-2. 닉네임 최소 3글자 이상, 알파벳 대소문자, 숫자 외 에러메세지
      if ((!/^[a-zA-Z0-9]+$/.test(nickname)) || (nickname.length < 4)) {
        return res.status(412).json({ errorMessage: "닉네임의 형식이 일치하지 않습니다." });
      };
      // 1-3. 패스워드, 확인패스워드 일치 검증
      if (password !== confirm) {
        return res.status(412).json({ errorMessage: "패스워드가 일치하지 않습니다." });
      };
      // 1-4. 패스워드 닉네임을 포함시키면 에러메세지
      if (password.includes(nickname)) {
        return res.status(412).json({ errorMessage: "패스워드에 닉네임이 포함되어 있습니다." });
      };
      // 1-5. 패스워드 4글자 이하이면 에러메세지 
      if (password.length <= 4) {
        return res.status(412).json({ errorMessage: "패스워드 형식이 일치하지 않습니다." });
      };
      // 2. 회원가입
      const result = await this.usersService.signup(nickname, password);
      if (result.message) {
        return res.status(200).json(result);
      } else {
        return res.status(400).json(result);
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errorMessage: "잘못된 데이터 형식입니다." });
    };
  };

  // 로그인
  login = async (req, res) => {
    try {
      // 1. 데이터 입력받기
      const { nickname, password } = req.body;
      // 2. 예외처리
      // 2-1. 회원찾기 (닉네임)
      const getUser = await this.usersService.getUserWithNickname(nickname);
      if (!getUser || getUser.password !== password) {
        return res.status(401).json({errorMessage: "닉네임 또는 패스워드를 확인해주세요."});
      };
      // 3. 로그인하기
      const result = await this.usersService.login(nickname, password);
      const { token, errorMessage } = result;
      if (result.token) {
        // 3-1. 쿠키 생성
        res.cookie("authorization", `Bearer ${token}`);
        return res.status(200).json({ token });
      } else {
        return res.status(400).json({ errorMessage });
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errorMessage: "잘못된 데이터 형식입니다." });
    };
  };
};

module.exports = UsersController;
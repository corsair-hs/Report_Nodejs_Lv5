// Method -> Input Data Check (try-catch) -> Request) Service.Method -> Response) Message/Data to Client 

const UsersService = require('../services/users.service.js');

class UsersController {
  usersService = new UsersService();

  // 회원가입
  signup = async (req, res) => {

    try {

      const { nickname, password, confirm } = req.body;
      
      const { num, msg } = await this.usersService.signup(nickname, password, confirm);
      
      if (num === 200) {
        return res.status(num).json({ message: msg });
      } else {
        return res.status(num).json({ errorMessage: msg });
      }

    } catch (err) {

      console.error(err);
      return res.status(400).json({ message: "회원 가입에 실패하였습니다." });

    };
  };

  // 로그인
  login = async (req, res) => {

    try {

      const { nickname, password } = req.body;

      const { num, msg } = await this.usersService.login(nickname, password);
      
      if (num === 200) {
        res.cookie("authorization", `Bearer ${msg}`); // msg: token
        return res.status(num).json({ token: msg });
      } else {
        return res.status(num).json({ errorMessage: msg });
      }

    } catch (err) {

      console.error(err);
      return res.status(400).json({ errorMessage: "로그인에 실패하였습니다."});

    };

  };
};

module.exports = UsersController;
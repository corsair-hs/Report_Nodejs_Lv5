// Method -> DB Query -> Response Data to Service

const { Users } = require("../models");

class UsersRepository {

  // 회원 DB 추가
  addUser = async ( nickname, password ) => {
    return await Users.create({ nickname, password });
  };

  // 닉네임으로 회원 찾기
  getUserWithNickname = async ( nickname ) => {
    return await Users.findOne({ where: { nickname } });
  };

  // userId로 회원 찾기
  getUserWithUserId = async ( userId ) => {
    return await Users.findOne({ where: { userId } });
  }
};

module.exports = UsersRepository;
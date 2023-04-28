// Method -> DB Query -> Response Data to Service

const { Comments } = require("../models");

class CommentsRepository {

  // 회원 DB 추가
  addUser = async ( nickname, password ) => {
    return await Users.create({ nickname, password });
  };

  // 닉네임으로 회원 찾기
  getUserWithNickname = async ( nickname ) => {
    return await Users.findOne({ where: { nickname } });
  };
};

module.exports = CommentsRepository;
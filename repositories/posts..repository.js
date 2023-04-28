// Method -> DB Query -> Response Data to Service

const { Users, Posts } = require("../models");

class PostsRepository {

  // 게시글 추가
  addUser = async ( nickname, password ) => {
    return await Users.create({ nickname, password });
  };

  // 닉네임으로 회원 찾기
  getUserWithNickname = async ( nickname ) => {
    return await Users.findOne({ where: { nickname } });
  };
};

module.exports = PostsRepository;
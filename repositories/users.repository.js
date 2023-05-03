// Method -> DB Query -> Response Data to Service

const { Users } = require("../models");

class UsersRepository {

  // Add Member
  addUser = async ( nickname, password ) => {
    return await Users.create({ nickname, password });
  };

  // Find Member with nickname
  getUserWithNickname = async ( nickname ) => {
    return await Users.findOne({ where: { nickname } });
  };

  // Find Member with userId
  getUserWithUserId = async ( userId ) => {
    return await Users.findOne({ where: { userId } });
  }
};

module.exports = UsersRepository;
"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const { ServerConfig } = require("../config");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6, 18],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  /**
   * This before create will allow us to do operation on user object before inserting into database
   */
  User.beforeCreate(function encryt(user) {
    // console.log("User Object before encryption", user);
    const encryptedPasssword = bcrypt.hashSync(
      user.password,
      parseInt(ServerConfig.SALT_ROUNDS)
    );
    user.password = encryptedPasssword;
    // console.log("User Object after encryption", user);
  });
  return User;
};

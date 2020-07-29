'use strict';
const bcrypt = require('bcrypt-nodejs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        User.belongsTo(models.Permission, {foreignKey: 'permission',as: "User - Permiss"})
        User.hasMany(models.Post, {foreignKey: 'id', as: "post"})
    }
  };
  User.init({
        fullname: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        images: DataTypes.STRING,
        permission: DataTypes.INTEGER
  },
  {
    sequelize,
    modelName: 'User',
  });
  return User;
};
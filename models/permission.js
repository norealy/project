'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Permission.hasMany(models.User, {foreignKey: 'id' ,as: 'pk perm_usr' })
    }
  };
  Permission.init({
    name: DataTypes.STRING,
    nb_per: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Permission',
  });
  return Permission;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User,{foreignKey:'id_user',as:'user'})
    }
  };
  Post.init({
        // id_user: DataTypes.INTEGER,
        id_user: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          }
        },
        images: DataTypes.STRING,
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        tag : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
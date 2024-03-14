'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.Conversation, {
        foreignKey: 'conversation_id',
        as: 'conversation' // Alias to access the association
      });
      Message.belongsTo(models.User, {
        foreignKey: 'sender_id',
        as: 'sender'
      })
    }
  }
  Message.init({
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    conversation_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
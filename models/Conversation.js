const Sequelize = require('sequelize');
const db = require('../controllers/sequelize').dbcongfig;

const mGame = db.define('Game', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  id_conversation: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  id_user_sender: {
    unique: true,
    type: Sequelize.INTEGER,
    allowNull: false
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

mGame.sync();

module.exports = mGame;

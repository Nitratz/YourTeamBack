const Sequelize = require('sequelize');
const db = require('../controllers/sequelize').dbcongfig;

const mGame = db.define('Game', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    unique: true,
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  background_image_url: {
    type: Sequelize.STRING,
    allowNull: true
  },
});

mGame.sync();

module.exports = mGame;
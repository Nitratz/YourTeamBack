const Sequelize = require('sequelize');
const db = require('../controllers/sequelize').dbcongfig;
const mGame = require('./Game');
const mUser = require('./User');

const mRoom = db.define('Room', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    rankIdMin: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    rankIdMax: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    hasLimit: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    limit: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 5
    }
});

mRoom.belongsTo(mGame, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});
mGame.hasMany(mRoom, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});

mRoom.belongsTo(mUser, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: 'CASCADE'
});
mUser.hasMany(mRoom, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: 'CASCADE'
})


mRoom.sync({
    force: true
});

module.exports = mRoom;
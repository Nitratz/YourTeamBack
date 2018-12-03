const mGame = require('../models/Game');
const mRank = require('../models/Rank');

class Game {
  constructor() {}

  async create(data) {
    let res;
    try {
      const game = await mGame.create({
        name: data.name,
        description: data.description,
        background_image_url: data.url
      });

      res = {
        success: true,
        id: game.dataValues.id
      }
    } catch (err) {
      let error = err.errors[0];
      res = {
        success: false,
        error: error.type,
        text: error.message
      };
    }
    return res;
  }

  async list() {
    try {
      const list = await mGame.findAndCountAll({
        attributes: [
          'id', 'name', 'description', 'background_image_url'
        ],
        include: [{
          model: mRank,
          attributes: ['id', 'name', 'icon_url', 'position', 'subrank'],
        }],
      });
      return list.rows;
    } catch (error) {
      return error;
    }
  }

  async createRanks(data) {
    let res = {
      created: true
    };
    try {
      await mGame.findById(data.gameId);
      try {
        for (let rank of data.ranks) {
          if (rank.subranks) {
            for (let subrank of rank.subranks) {
              await mRank.create({
                GameId: data.gameId,
                name: rank.name,
                icon_url: rank.icon_url,
                position: rank.position,
                subrank: subrank
              });
            }
          } else {
            await mRank.create({
              GameId: data.gameId,
              name: rank.name,
              icon_url: rank.icon_url,
              position: rank.position
            });
          }
        }
      } catch (error) {
        res = {
          success: false,
          error: error.type,
          text: error.text
        }
      }
    } catch (error) {
      res = {
        success: false,
        error: error.type,
        text: "GameId provided is not inside our database."
      }
    }
    return res;
  }
}
module.exports = Game;
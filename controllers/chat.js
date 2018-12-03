const mRoom = require('../models/Room');
const mGame = require('../models/Game');

class Chat {
    constructor() {}

    async listRooms() {
        try {
            const list = await mRoom.findAndCountAll({
                attributes: [
                    'id', 'name', 'haslimit', 'rankIdMin', 'rankIdMax', 'limit', 'UserCreatorId'
                ],
                include: [{
                    model: mGame,
                    attributes: ['id', 'name', 'description', 'background_image_url'],
                }],
            });
            return list.rows;
        } catch (error) {
            return error;
        }
    }

    async createRoom(userId, data) {
        try {
            const room = await mRoom.create({
                GameId: data.gameId,
                UserId: userId,
                name: data.name,
                rankIdMin: data.rankIdMin,
                rankIdMax: data.rankIdMax,
                hasLimit: data.hasLimit ? data.hasLimit :  true,
                limit: data.limit ? data.limit : 5
            });

            const game = await mGame.findById(data.gameId);
            return {
                success: true,
                room: `${game.dataValues.name}/${room.dataValues.id}`
            };
        } catch (error) {
            return {
                success: false,
                error: error
            };
        }
    }
}

module.exports = Chat;
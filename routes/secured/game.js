const express = require("express");
const router = express.Router();
const Game = require("../../controllers/game")

router.post("/api/game/create", async (req, res) => {
    const gameCtrl = new Game();
    try {
        const game = await gameCtrl.create(req.body);
        if (game.success) {
            res.json({
                success: true
            });
        } else {
            res.status(400).json(res);
        }
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get("/api/game/list", async (req, res) => {
    const gameCtrl = new Game();
    try {
        const list = await gameCtrl.list();
        res.json(list)
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post("/api/game/rank/create", async (req, res) => {
    const gameCtrl = new Game();
    try {
        const ranks = await gameCtrl.createRanks(req.body);
        if (ranks.success) {
            res.json({
                success: true
            });
        } else {
            res.status(400).json(ranks);
        }
    } catch (err) {
        res.status(400).json(err);
    }

});

module.exports = router;
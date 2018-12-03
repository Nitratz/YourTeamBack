const express = require("express");
const router = express.Router();
const Chat = require("../../controllers/chat");

router.get("/api/room/list", async (req, res) => {
    const chatCtrl = new Chat();
    try {
        const list = await chatCtrl.listRooms();
        res.json(list)
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post("/api/room/create", async (req, res) => {
    const chatCtrl = new Chat();
    const userId = req.userId;
    try {
        const room = await chatCtrl.createRoom(userId, req.body);
        res.json(room)
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;
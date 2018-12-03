const express = require('express');
const router = express.Router();
const User = require('../../controllers/user');

router.post('/api/signup', async (req, res) => {
    const body = req.body;
    const u = new User(body.email, body.password, body.nickname);
    if (body.password && body.email && body.nickname) {
        await u.hashpass(body.password);
        try {
            const user = await u.create(process.env.SUPER_SECRET);
            if (user.success) {
                res.json(user);
            } else {
                res.status(400).json(user);
            }
        } catch (error) {
            res.status(400).json(error);
        }
    } else {
        res.status(400).json({
            created: false,
            error: "invalid_grant",
            text: "Missing parameter(s) in the body"
        });
    }
});

router.post('/api/login', async (req, res) => {
    const body = req.body;
    const u = new User(body.email, body.password);
    try {
        const user = await u.auth(process.env.SUPER_SECRET);
        if (user.success) {
            res.json(user);
        } else {
            res.status(400).json(user);
        }
    } catch (error) {
        res.status(400).json(error);
    }
});
module.exports = router;
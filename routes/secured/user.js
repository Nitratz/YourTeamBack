const express = require("express");
const router = express.Router();
const User = require("../../controllers/user");

router.post("/api/logout", (req, res) => {
  if (req.session) {
    req.session.destroy();
  }
  res.json({
    success: true,
    msg: "User disconnected"
  });
});

router.post("/api/account", async (req, res) => {
  const userId = req.userId;
  const user = new User();
  try {
    const edit = await user.edit(req.body, userId);
    if (edit.success) {
      res.json({
        success: true
      });
    } else {
      res.status(400).json(edit);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/api/account", async (req, res) => {
  const userId = req.userId;
  const user = new User();

  try {
    await user.delete(userId);
    res.json({
      success: true
    });      
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error
    });
  }
});

router.get("/api/account/me", async (req, res) => {
  const userId = req.userId;
  const userCtrl = new User();
  const user = await userCtrl.findById(userId);

  if (user && user.id === userId) {
    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname
      }
    });
  } else {
    res.status(400).json({
      success: false
    });
  }
});

router.post("/api/user/addRank", async (req, res) => {
    const userId = req.userId;
    const userCtrl = new User();

    try {
      await userCtrl.addRank(userId, req.body.gameId, req.body.rankId);
      res.json({success: true});      
    } catch (error) {
      res.status(400).json(error);
    }
});

module.exports = router;

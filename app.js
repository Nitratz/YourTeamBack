require("dotenv").config();
const app = require("./controllers/server").app;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const ws = require("./routes/websockets"); // eslint-disable-line
const mUser = require('./models/modelLoader').mUser;
const cors = require('cors');

app.use(morgan("dev"));

app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type', 'Authorization'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  })
);

app.use(require("./routes/open/api"));

app.use(async (req, res, next) => {
  const result = {
    success: false,
    error: "TOKEN",
    msg: "No Bearer token provided."
  };

  if (req.headers.authorization) {
    const authorization = req.headers.authorization.split(" ");
    if (authorization[0] === "Bearer") {
      const token = authorization[1];
      if (token) {
        try {
          const decoded = await jwt.verify(token, process.env.SUPER_SECRET);
          const user = await mUser.find({
            where: {
              id: decoded.id
            }
          });
          if (user) {
            req.userId = user.dataValues.id;
            req.email = user.dataValues.email;
            req.nickname = user.dataValues.nickname;
            next();
          } else {
            res.status(401).json({
              success: false,
              error: "TOKEN",
              msg: "The account link to this token does not exist anymore"
            });
          }
        } catch (error) {
          result.error = "TOKENEXPIRED";
          result.msg = "Failed to authenticate token.";
          res.status(401).json(result);
        }
      } else {
        res.status(401).json(result);
      }
    } else {
      res.status(401).json(result);
    }
  } else {
    res.status(401).json(result);
  }
});

app.use(require("./routes/secured/api"));

// Handle 404
app.use(function(req, res) {
  res.status(404).send("404: Page not Found");
});

// Handle 500
app.use(function(error, req, res) {
  res.status(500).send("500: Internal Server Error");
});

const route = require('express').Router();
const bodyParser = require("body-parser");
route.use(bodyParser.json());

route.post("/users", (req, res, next) => {
    res.status(200).json({
        message: "User fetched successfully"
    });
});

module.exports = route;
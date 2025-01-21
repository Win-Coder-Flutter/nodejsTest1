const route = require('express').Router();

route.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Test route"
    })
})
module.exports = route;
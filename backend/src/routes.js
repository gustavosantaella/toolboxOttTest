const express = require("express")
const route = express.Router()
const getFiles = require("./service")


route.get("/files/data", getFiles)


module.exports = route
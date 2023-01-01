const express = require("express")
const route = require("./src/routes")
const bodyParser = require("body-parser")
const cors = require('cors')

const server = (app) => {

    app.use(cors())
    app.use(route)
    app.use(bodyParser.json())
    app.listen(8000, () => {
        console.log("Server is listening on port 8000")
    })
}

server(express())
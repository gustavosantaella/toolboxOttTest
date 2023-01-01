const express = require("express")
const route = require("./src/routes")
const bodyParser = require("body-parser")
const cors = require('cors')

const server = (app) => {

    app.use(cors({
        origin:["http://localhost:3000", "http://35.173.242.100:3000"],
        additionalHeaders: ['Accept', 'Access-Control-Allow-Origin', 'Referer', 'User-Agent']
        }))
    app.use(route)
    app.use(bodyParser.json())
    app.listen(8000, () => {
        console.log("Server is listening on port 8000")
    })

    return app
}

module.exports  = server(express())
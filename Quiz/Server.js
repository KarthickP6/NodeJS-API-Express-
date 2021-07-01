const express = require("express")
const mongoose = require("mongoose") // new
const routes = require("./router/router")

// Connect to MongoDB database
mongoose
	.connect("mongodb://localhost:27017/quiz", { useNewUrlParser: true })
	.then(() => {
        console.log("Database connected")
		const app = express()

        app.use(express.json()) // new
		app.use("", routes)
        var cors = require('cors')

        app.use(cors()) 
        let allowCrossDomain = function(req, res, next) {
            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Headers', "*");
            next();
          }
          app.use(allowCrossDomain);

		app.listen(5000, () => {
			console.log("Server has started!")
		})
	})
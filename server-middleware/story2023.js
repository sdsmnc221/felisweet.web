// server-middleware/story2023.js

const path = require('path')
const express = require('express')

const app = express()

// Serve static files from the story-2023 directory
app.use(express.static(path.join(__dirname, '..', 'static', 'story-2023')))

module.exports = app

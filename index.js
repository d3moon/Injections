const express = require('express');
const routes = require('./routes.js')
const app = express()

app.use(express.json())
app.use('/', routes)

app.listen(3333, ()=> console.log('listening on port '+3333))
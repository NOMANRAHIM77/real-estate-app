
const express = require('express')
const app = express()

const postRoute = require('./routes/post.route')
const authRoute = require('./routes/auth.route')

app.use(express.json())


app.use("/api/post",postRoute)
app.use("/api/auth",authRoute)



module.exports = app
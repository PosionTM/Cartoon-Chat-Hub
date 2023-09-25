const express = require('express')
const path = require('path')
const app = express()

const PORT = process.env.PORT || 5000 // start server on assigned port OR port 5000

app.use(express.json()) // enable handling of raw JSON
app.use(express.urlencoded({ extended: false })) // Handle URL encoded data



// Starting up server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))


const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const {env: {MONGO_URI}} = require('./config')

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log('database connected'))
    .catch(error => console.log(error))

const app = express()

app.use(express.json())
app.use(cors({credentials: true, origin: ['https://clients-list.netlify.app', 'http://localhost:3000']}))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))

export {app}
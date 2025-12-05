const {connectDB} = require('./config/database')
const express = require('express')
const cors = require('cors')
const { leadRouter } = require('./routes/leadRouter')
const { salesAgentRouter } = require('./routes/salesAgentRouter')

const app = express()

app.use(cors({
  origin: '*',
  //origin: 'http://localhost:5173',
  //origin: 'https://code-mingle-web.vercel.app',
  credentials: true
}))
app.use(express.json())

app.use('/', leadRouter)
app.use('/', salesAgentRouter)
app.get('/', (req, res) => {
    res.status(200).send('Welcome to Engage360 Server, The 360° Lead Experience')
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Server is listening on port 3000')
        })
    })
    .catch((err) => {
        console.log('Error while connecting to DB, ', err)
    })

module.exports = {app}
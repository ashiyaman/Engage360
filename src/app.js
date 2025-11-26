const {connectDB} = require("./config/database")
const express = require("express")
const { leadRouter } = require("./routes/leadRouter")

const app = express()
app.use(express.json())

app.use("/", leadRouter)
app.get("/", (req, res) => {
    res.status(200).send("Welcome to Engage360 Server, The 360° Lead Experience")
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Server is listening on port 3000")
        })
    })
    .catch((err) => {
        console.log("Error while connecting to DB, ", err)
    })

module.exports = {app}
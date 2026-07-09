const app = require('./app');
const {connectDB} = require('./config/database')

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Server is listening on port 3000')
        })
    })
    .catch((err) => {
        console.log('Error while connecting to DB, ', err)
    })

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
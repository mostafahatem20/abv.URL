require('dotenv').config()
const { app } = require('./Xpress')
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
mongoose
  .connect(process.env.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log('db is connected'))
  .catch((err) => console.log(err))
app.listen(port, () => {
  console.log('Running --> Application on ' + port)
})

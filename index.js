require('dotenv').config()
const { app } = require('./Xpress')
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Running --> Application on ' + port)
  })
  
require('dotenv').config()
const { app } = require('./Xpress')
const mongoose = require('mongoose')
const { shortenSchema, updateVisitsSchema } = require('./schemas')
const shortUrl = require('./models/shortUrl')
const path = require('path')
const port = process.env.PORT || 3000
mongoose
  .connect(process.env.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log('db is connected'))
  .catch((err) => console.log(err))
app.get('/getURLS', async (req, res) => {
  const shortURLS = await shortUrl.find()
  return res.json({ shortURLS })
})
app.post('/shorten', async (req, res) => {
  let validation = shortenSchema.validate(req.body)

  if (validation.error) {
    return res.json({
      exitCode: 1,
      error: validation.error.details[0].message,
    })
  }
  const found = await shortUrl.findOne({ full: req.body.url })
  if (found) {
    await shortUrl.updateOne(
      { _id: found._id },
      { attempts: found.attempts + 1 }
    )
    return res.json({
      exitCode: 0,
      short: found.short,
      attempts: found.attempts + 1,
      visits: found.visits,
      full: found.full,
      id: found._id,
    })
  }
  const short = await shortUrl.create({ full: req.body.url })
  return res.json({
    exitCode: 0,
    short: short.short,
    attempts: short.attempts,
    visits: short.visits,
    full: short.full,
    id: short._id,
  })
})
app.get('/:shortUrl', async (req, res) => {
  const short = await shortUrl.findOne({ short: req.params.shortUrl })
  if (short == null) return res.sendStatus(404)

  short.visits++
  short.save()

  res.redirect(short.full)
})
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})
app.listen(port, () => {
  console.log('Running --> Application on ' + port)
})

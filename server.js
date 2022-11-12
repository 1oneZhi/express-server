import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import { mongoURI } from './config/key.js'
import user from './router/api/user.js'
import strategy from './config/passport.js'

passport.use(strategy)

mongoose.connect(mongoURI, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(`Connect Error ${err}`)
  } else {
    console.log('MongoDB Connected')
  }
})

const app = express()
const port = process.env.port || 8080
const host = process.env.host || '124.221.149.101'

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.urlencoded({ extended: true })).use(express.json())
app.use(passport.initialize())
app.use('/api/user', user)
app.listen(port, () => console.log(`Server running on port ${port}`))
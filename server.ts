import express from 'express'
import history from 'connect-history-api-fallback'
import mongoose from 'mongoose'
import passport from 'passport'
import { mongoURI } from 'config/key'
import user from 'router/api/user'
import strategy from 'config/passport'

mongoose.connect(mongoURI, (err) => {
  if (err) {
    console.log(`Connect Error ${err}`)
  } else {
    console.log('MongoDB Connected')
  }
})

const app = express()
const port = Number(process.env.port) || 80
const host = process.env.host || '0.0.0.0'

app.use(express.urlencoded({ extended: true })).use(express.json())
app.use(passport.use(strategy).initialize())
app.use('/api/user', user)
app.use(history()).use(express.static('public/build'))

app.listen(port, host, () => console.log(`Server running on ${host}:${port}`))
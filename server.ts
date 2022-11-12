import express from 'express'
import history from 'connect-history-api-fallback'
import { connect } from 'mongoose'
import passport from 'passport'
import { mongoURI } from 'config/key'
import strategy from 'config/passport'
import user from 'router/api/user'
import profile from 'router/api/profile'

connect(mongoURI, (err) => {
  if (err != null) {
    console.log('Connect Error', err)
  } else {
    console.log('MongoDB Connected')
  }
})

const app = express()
const port = 80
const host = '0.0.0.0'

app.use(express.urlencoded({ extended: true })).use(express.json())
app.use(passport.use(strategy).initialize())
app.use('/api/user', user).use('/api/profile', profile)
app.use(history()).use(express.static('public/build'))

app.listen(port, host, () => console.log(`Server running on ${host}:${port}`))

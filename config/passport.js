import { Strategy, ExtractJwt } from 'passport-jwt'
import User from '../model/User.js'
import { secretOrKey } from './key.js'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey
}

export default new Strategy(options, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
    .then(user => {
      if (user) return done(null, user)
      return done(null, false)
    })
    .catch(err => console.log(err))
})
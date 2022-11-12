import { Strategy, ExtractJwt } from 'passport-jwt'
import User from '../model/User.js'
import { secretOrKey } from './key.js'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey
}

export default new Strategy(options, async(jwt_payload, done) => {
  const user = await User.findById(jwt_payload.id)
  return done(null, user)
})
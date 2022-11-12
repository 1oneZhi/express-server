import { Strategy, ExtractJwt } from 'passport-jwt'
import User from '../model/User.js'
import { secretOrKey } from './key.js'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey
}

export default new Strategy(options, async (jwtPayload, done) => {
  const user = await User.findById(jwtPayload.id)
  if (user != null) return done(null, user)
  else return done(null, false)
})

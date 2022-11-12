import express from 'express'
import bcrypt from 'bcrypt'
import gravatar from 'gravatar'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import User from '../../model/User.js'
import { secretOrKey } from '../../config/key.js'

const router = express.Router()
/* router.get('/test', (req, res) => {
  res.json({
    msg: 'login works'
  })
}) */
router.post('/register', (req, res) => {
  const { email, name, password, identity }  = req.body
  User.findOne({
    email
  })
    .then(user => {
      if (user) return res.status(400).json({
        email: '邮箱已被占用'
      })
      else {
        const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })
        const newUser = new User({ email, password, name, avatar, identity })
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        })
      }
    })
})
router.post('/login', (req, res) => {
  const { email, password } = req.body
  User.findOne({ email })
    .then(user => {
      if (!user)return res.json('用户不存在')
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          const { id, name, avatar, identity } = user
          if (isMatch) {
            const rule = { id, name, avatar, identity }
            jwt.sign(rule, secretOrKey, { expiresIn: 3600}, (err, token) => {
              if (err) throw err
              res.json({ token: `Bearer ${token}` })
            })
          }
          else return res.json('密码错误')
        })
    })
})
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id, name, email, identity } = req.user
  res.json({ id, name, email, identity })
})

export default router
import { Router } from 'express'
import bcrypt from 'bcrypt'
import gravatar from 'gravatar'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import User from 'model/User'
import { secretOrKey } from 'config/key'

const router = Router()
router.post('/register', async (req, res) => {
  const { email, name, password, identity } = req.body
  const user = await User.findOne({ email })
  if (user != null) return res.status(400).json({ email: '邮箱已被占用' })
  else {
    const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const newUser = new User({ email, password: hash, name, avatar, identity })
    const user = await newUser.save()
    res.json(user)
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user == null) return res.json('用户不存在')
  const { id, name, avatar, identity } = user
  const isMatch = await bcrypt.compare(password, user.password)
  if (isMatch) {
    const rule = { id, name, avatar, identity }
    const token = jwt.sign(rule, secretOrKey, { expiresIn: '7 days' })
    res.json({ token: `Bearer ${token}` })
  } else return res.json('密码错误')
})

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id, name, email, identity } = req.user
  res.json({ id, name, email, identity })
})

export default router

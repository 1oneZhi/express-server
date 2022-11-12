import { Router } from 'express'
import passport from 'passport'
import Profile from 'model/Profile'

const router = Router()
router.post('/add', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { type, describe, income, expend, cash, remark } = req.body
  const profileFields = { type, describe, income, expend, cash, remark }
  const profile = await new Profile(profileFields).save()
  res.json(profile)
})

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const profile = await Profile.find()
  res.json(profile)
})

router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const profile = await Profile.findOne({ _id: req.params.id })
  res.json(profile)
})

router.post('/edit/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { type, describe, income, expend, cash, remark } = req.body
  const profileFields = { type, describe, income, expend, cash, remark }
  const profile = await Profile.findOneAndUpdate(
    { _id: req.params.id },
    { $set: profileFields },
    { new: true }
  )
  res.json(profile)
})

router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const profile = await Profile.findOneAndDelete({ _id: req.params.id })
  res.json(profile)
})

export default router

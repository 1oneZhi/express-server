import { Schema, model } from 'mongoose'

const ProfileSchema = new Schema({
  type: {
    type: String
  },
  describe: {
    type: String
  },
  income: { // 收入
    type: String,
    required: true
  },
  expend: { // 支出
    type: String,
    required: true
  },
  cash: { // 现金
    type: String,
    required: true
  },
  remark: { // 备注
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

export default model('profile', ProfileSchema)

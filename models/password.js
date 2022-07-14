import mongoose, { mongo } from 'mongoose'
import bcrypt from 'bcrypt'
const SALT_ROUNDS = 6

const Schema = mongoose.Schema

const passwordSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Profile'
    },
    site: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }
)

passwordSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password
    return ret
  },
})

passwordSchema.pre('save', function (next) {
  const pass = this
  if (!pass.isModified('password')) return next()
  bcrypt.hash(pass.password, SALT_ROUNDS)
  .then(hash => {
    pass.password = hash
    next()
  })
  .catch(err => {
    next(err)
  })
})

passwordSchema.methods.comparePassword = function (tryPassword, cb) {
  bcrypt.compare(tryPassword, this.password, cb)
}

const Password = mongoose.model('Password', passwordSchema)

export {Password}
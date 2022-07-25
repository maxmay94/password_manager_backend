import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const SALT_ROUNDS = 10

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
    passW: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

passwordSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.passW
    return ret
  },
})

passwordSchema.pre('save', function (next) {
  const pass = this
  if (!pass.isModified('passW')) return next()
  bcrypt.hash(pass.passW, SALT_ROUNDS)
  .then(hash => {
    pass.passW = hash
    next()
  })
  .catch(err => {
    next(err)
  })
})

passwordSchema.methods.comparePassword = function (tryPassword, cb) {
  bcrypt.compare(tryPassword, this.passW, cb)
}

const Password = mongoose.model('Password', passwordSchema)

export {Password}
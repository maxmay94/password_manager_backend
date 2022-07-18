import { Password } from '../models/password.js'

const index = async(req, res) => {
  try{
    const passwords = await Todo.find({})
    return res.status(200).json(passwords)
  } catch(err) {
    return res.status(500).json(err)
  }
}

const create = async(req, res) => {
  req.body.userId = req.body.user.profile
  try {
    const password = await new Password(req.body)
    await password.save()
    return res.status(200).json(password)
  } catch (err) {
    return res.status(500).json(err)
  }
}

export {
  index,
  create
}
import { Password } from '../models/password.js'

const index = async(req, res) => {
  req.body.userId = req.user.profile
  try{
    const passwords = await Password.find({userId: req.body.userId})
    return res.status(200).json(passwords)
  } catch(err) {
    return res.status(500).json(err)
  }
}

const create = async(req, res) => {
  req.body.userId = req.user.profile
  try {
    const password = new Password(req.body)
    await password.save()
    return res.status(200).json(password)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const deletePassword = async(req, res) => {
  try {
    await Password.findByIdAndDelete(req.params.id)
    return res.status(204).end()
  } catch (err) {
    return res.status(500).json(err)
  }
}

export {
  index,
  create,
  deletePassword as delete
}
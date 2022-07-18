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
  console.log(req.body)
  try {
    const password = new Password(req.body)
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
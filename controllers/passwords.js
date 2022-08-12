import { Password } from '../models/password.js'
import bcrypt from 'bcrypt'
const SALT_ROUNDS = 10

const index = async(req, res) => {
  req.body.userId = req.user.profile
  try{
    const passwords = await Password.find({userId: req.body.userId})

    console.log(passwords)
    console.log('@@@@@@',req.user)

    return res.status(200).json(passwords)
  } catch(err) {
    return res.status(500).json(err)
  }
}

const create = async(req, res) => {
  req.body.userId = req.user.profile
  console.log('\n@@@@@@@@@@@@@@@@@@@@@@@@@@@\n', req.body ,'\n@@@@@@@@@@@@@@@@@@@@@@@@@@@\n')
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

const update = async(req, res) => {
  try {
    const newPass = await bcrypt.hash(req.body.password, SALT_ROUNDS)
    req.body.password = newPass
    const password = await Password.findByIdAndUpdate(req.params.id, await req.body)

    await password.save()
    return res.status(201).json(password)
  } catch (err) {
    return res.status(500).json(err)
  }
}

export {
  index,
  create,
  deletePassword as delete,
  update
}
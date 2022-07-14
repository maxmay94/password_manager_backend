import { Router } from 'express'
import * as passwordCtrl from '../controllers/passwords.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth'

const router = Router()

/* ------------------ Public Routes ------------------ */


/* ------------------ Private Routes ------------------ */
router.use(decodeUserFromToken)
router.get('/', passwordCtrl.index)
router.post('/', passwordCtrl.create)

export { router }
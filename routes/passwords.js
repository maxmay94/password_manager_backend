import { Router } from 'express'
import * as passwordCtrl from '../controllers/passwords.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/* ------------------ Public Routes ------------------ */


/* ------------------ Private Routes ------------------ */
router.use(decodeUserFromToken)
router.get('/', checkAuth, passwordCtrl.index)
router.post('/', checkAuth, passwordCtrl.create)
router.delete('/:id', checkAuth, passwordCtrl.delete)
router.patch('/:id', checkAuth, passwordCtrl.update)

export { router }
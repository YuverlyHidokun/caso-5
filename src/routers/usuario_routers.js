import{
    registro,
    login,
    recuperarpassword
} from '../controllers/usuario_controller.js'

import { Router } from 'express'

const router = Router()

router.post('/usuario/login', login)//OK
router.post('/usuario/registro', registro)//OK
router.post('/usuario/recuperar-password',recuperarpassword)//OK

export default router
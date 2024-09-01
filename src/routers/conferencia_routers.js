import{
    crearConferencia,
    verConferencia,
    detalleConferencia,
    actualizarConferencia, 
    eliminarConferencia
} from '../controllers/conferencia_controller.js'
import { Router } from 'express'
import verificarJWT from '../middlewares/verificarJWT.js'

const router = Router()

router.post('/conferencia/crear', verificarJWT, crearConferencia)//OK
router.get('/conferencia/ver', verificarJWT, verConferencia)//OK
router.get('/conferencia/ver/:id', verificarJWT, detalleConferencia)//OK
router.put('/conferencia/actualizar/:id', verificarJWT, actualizarConferencia)//OK
router.delete('/conferencia/eliminar/:id', verificarJWT, eliminarConferencia)//OK

export default router



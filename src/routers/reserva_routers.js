import{
    crearReserva,
    VerReserva,
    detalleReserva,
    ActualizarReserva,
    EliminarReserva
} from '../controllers/reserva_controller.js'
import { Router } from 'express'
import verificarJWT from '../middlewares/verificarJWT.js'

const router = Router()

router.post('/reserva/crear', verificarJWT, crearReserva )//OK
router.get('/reserva/ver', verificarJWT, VerReserva )//OK
router.get('/reserva/ver/:id', verificarJWT, detalleReserva)//OK
router.put('/reserva/actualizar/:id', verificarJWT, ActualizarReserva)//OK
router.delete('/reserva/eliminar/:id', verificarJWT, EliminarReserva)//OK

export default router

import{
    crearAuditorio,
    verAuditorio,
    detalleAuditorio,
    actualizarAuditorio,
    eliminarAuditorio
} from '../controllers/auditorio_controller.js'
import { Router } from 'express'
import verificarJWT from '../middlewares/verificarJWT.js'

const router = Router()

router.post('/auditorio/crear', verificarJWT, crearAuditorio)//OK
router.get('/auditorio/ver', verificarJWT, verAuditorio)//OK
router.get('/auditorio/ver/:id', verificarJWT, detalleAuditorio)//OK
router.put('/auditorio/actualizar/:id', verificarJWT, actualizarAuditorio)//OK
router.delete('/auditorio/eliminar/:id', verificarJWT, eliminarAuditorio)//OK

export default router

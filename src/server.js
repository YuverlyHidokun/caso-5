import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routerusuario from './routers/usuario_routers.js'
import routerconferencia from './routers/conferencia_routers.js'
import routerauditorio from './routers/auditorio_routers.js'


const app = express()
dotenv.config()

app.set('port', process.env.port || 3000 )
app.use(cors())

app.use(express.json())

app.get('/', (req,res)=>{
    res.send("Server on")
})

app.use('/caso5', routerusuario)
app.use('/caso5', routerconferencia)
app.use('/caso5', routerauditorio)



export default app
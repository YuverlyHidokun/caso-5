import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.set('port', process.env.port || 3000 )
app.use(cors())

app.use(express.json())

app.get('/', (req,res)=>{
    res.send("Server on")
})

export default app
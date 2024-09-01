import jwt, { decode } from 'jsonwebtoken'

const verificarJWT = (req, res, next) =>{
    const token = req.header("Autorizacion")?.replace("Bearer", "")

    if(!token){
        res.status(401).json({msg: "No se ha colocado el Token, permiso denegado"})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.usuario = decoded
        next(); 

    }catch(error){
        res.status(400).json({msg: "Token no Valido"}, error)
    }
}

export default verificarJWT
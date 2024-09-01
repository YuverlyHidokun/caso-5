import Usuario from '../models/usuario.js'
import generarJWT from '../helpers/crearJWT.js'
import mongoose from 'mongoose'

const registro = async(req, res) =>{
    const {nombre, apellido, email, password} = req.body
    if(Object.values(req.body).includes("")){
        res.status(400).json("Lo sentimos, debe llenar todos los campos")
    }
    const caracteres = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (!caracteres.test(nombre)) {
        return res.status(400).json({ msg: "El nombre solo puede contener letras y espacios" });
    }
    if (!caracteres.test(apellido)) {
        return res.status(400).json({ msg: "El apellido solo puede contener letras y espacios" });
    }

    const verificarEmail = await Usuario.findOne({email})

    if(verificarEmail){
        res.status(400).json({msg: "El email ya se encuentra registrado, intente con uno diferente"})
    }

    const nuevoUsuario = new Usuario(req.body)
    nuevoUsuario.password = await nuevoUsuario.encrypPassword(password)
    nuevoUsuario.crearToken()
    await nuevoUsuario.save()

    res.status(200).json({msg: "Se ha creado el usuario con exito"})
}

const login = async(req, res) =>{
    const {email, password} = req.body

    if(Object.values(req.body).includes("")){
        res.status(400).json("Lo sentimos, debe llenar todos los campos")
    }

    const usuarioBDD = await Usuario.findOne({email})
    if(!usuarioBDD){
        return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"});
    } 
    const verificarPassword = await usuarioBDD.matchPassword(password);
    if(!verificarPassword){
        return res.status(404).json({msg:"Lo sentimos, el password no es el correcto"});
    }

    const token = generarJWT(usuarioBDD._id, usuarioBDD.rol)

    res.status(200).json({
        _id: usuarioBDD._id,
        nombre: usuarioBDD.nombre,
        apellido: usuarioBDD.apellido,
        email: usuarioBDD.email,
        token
    })
}

const recuperarpassword = async(req, res) =>{
    const { email, nuevopassword } = req.body;

    try {
        if (!email || !nuevopassword) {
            return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
        }

        const usuarioBDD = await Usuario.findOne({ email: email.trim() });
        if (!usuarioBDD) {
            return res.status(404).json({ msg: "Lo sentimos, el usuario no se encuentra registrado" });
        }

        usuarioBDD.password = await usuarioBDD.encrypPassword(nuevopassword);
        await usuarioBDD.save();
        return res.status(200).json({ msg: "La contraseña fue cambiada exitosamente" });
        
    } catch (error) {
        console.error("Error al intentar recuperar la contraseña:", error);
        return res.status(500).json({ msg: "Hubo un error en el servidor" });
    }
}

export{
    registro,
    login,
    recuperarpassword
}
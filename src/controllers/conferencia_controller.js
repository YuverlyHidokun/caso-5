import Conferencia from "../models/conferencia.js";
import mongoose, { Mongoose } from "mongoose";

const crearConferencia = async(req, res)=>{
    const {nombre, apellido, cedula, fecha_nacimiento, genero, direccion,ciudad, telefono, email, empresa}= req.body
    if(Object.values(req.body).includes("")){
        return res.status(400).json({msg: "Lo sentimos, debe llenar todos los campos"})
    }

    const verificarCedula = await Conferencia.findOne({cedula})
    if(verificarCedula){
        return res.status(400).json({msg:"Ya existe un Conferencista con esa cedula"})
    } 
    const Verificartelefono = await Conferencia.findOne({telefono})
    if(Verificartelefono){
        return res.status(400).json({msg:"Lo sentimos, el telefono ya se encuentra registrado"})
    }
    const verificarEmail = await Conferencia.findOne({email})
    if(verificarEmail){
        return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
    }

    const nuevoConferencista= new Conferencia({nombre, apellido, cedula, fecha_nacimiento, genero, direccion,ciudad, telefono, email, empresa})
    await nuevoConferencista.save()

    res.status(200).json({msg:"El Conferencista fue Registrado con exito"})

}

const verConferencia = async(req, res)=>{
    try{
        const conferencia = await Conferencia.find().select("-createdAt -updatedAt -__v")
        res.json(conferencia)
    }catch(error){
        res.status(500).json({msg:"Hubo un error al mostrar los conferencistas", error})
    }
}

const detalleConferencia = async(req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg:`Lo sentimos, no se encuentra registrado el Conferencista`});
    }
    const conferencia = await Conferencia.findById(id).select("-createdAt -updatedAt -__v")
    res.status(200).json(conferencia)
}

const actualizarConferencia = async(req, res) =>{
    const {id} = req.params
    if (Object.values(req.body).includes("")) {
        return res.status(400).json({ msg: "Lo sentimos, debe llenar todos los datos" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "No se ha encontrado a un Conferencista con ese ID" });
    }

    try{
        const conferenciaActualziada = await Conferencia.findByIdAndUpdate(id, req.body, {new: true})
        if(!conferenciaActualziada){
            return res.status(400).json({msg: "Conferencista no Encontrado"})
        }
        res.status(200).json({msg: "Conferencista Actualizado Correctamente"})
    }catch(error){
        console.error("Error al actualizar el técnico:", error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
}

const eliminarConferencia = async (req, res) =>{
    const {id}= req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "No se ha encontrado a un Conferencista con ese ID" });
    }
    await Conferencia.findByIdAndDelete(id)
    res.status(200).json({msg: "Se ha elminado al Conferencistaa Correctamente"})
}

export{
    crearConferencia,
    verConferencia,
    detalleConferencia,
    actualizarConferencia, 
    eliminarConferencia
}
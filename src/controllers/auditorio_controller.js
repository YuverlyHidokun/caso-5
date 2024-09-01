import Auditorio from "../models/auditorio.js";
import mongoose, { Mongoose } from "mongoose";

const crearAuditorio = async(req, res) =>{
    const {nombre, cedula, direccion,ciudad, ubicacion, capacidad, descripcion}= req.body
    if(Object.values(req.body).includes("")){
        return res.status(400).json({msg: "Lo sentimos, debe llenar todos los campos"})
    }

    const verificarCedula = await Auditorio.findOne({cedula})
    if(verificarCedula){
        return res.status(400).json({msg:"Ya existe un Auditorio con esa cedula"})
    }

    const nuevoAuditorio= new Auditorio({nombre, cedula, direccion,ciudad, ubicacion, capacidad, descripcion})
    await nuevoAuditorio.save()

    res.status(200).json({msg:"El Auditorio fue Registrado con exito"})
}

const verAuditorio =async(req, res)=>{
    try{
        const auditorio = await Auditorio.find().select("-createdAt -updatedAt -__v")
        res.json(auditorio)
    }catch(error){
        res.status(500).json({msg:"Hubo un error al mostrar los auditorios", error})
    }
}

const detalleAuditorio = async(req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg:`Lo sentimos, no se encuentra registrado el Auditorio`});
    }
    const auditorio = await Auditorio.findById(id).select("-createdAt -updatedAt -__v")
    res.status(200).json(auditorio)
}

const actualizarAuditorio = async(req, res) =>{
    const {id} = req.params
    if (Object.values(req.body).includes("")) {
        return res.status(400).json({ msg: "Lo sentimos, debe llenar todos los datos" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "No se ha encontrado a un Auditorio con ese ID" });
    }

    try{
        const auditorioActualziado = await Auditorio.findByIdAndUpdate(id, req.body, {new: true})
        if(!auditorioActualziado){
            return res.status(400).json({msg: "Auditorio no encontrado"})
        }
        res.status(200).json({msg: "Auditorio Actualizado Correctamente"})
    }catch(error){
        console.error("Error al actualizar el auditorio:", error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
}

const eliminarAuditorio = async (req, res) =>{
    const {id}= req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "No se ha encontrado un Auditorio con ese ID" });
    }
    await Auditorio.findByIdAndDelete(id)
    res.status(200).json({msg: "Se ha elminado al Auditorio Correctamente"})
}


export{
    crearAuditorio,
    verAuditorio,
    detalleAuditorio,
    actualizarAuditorio,
    eliminarAuditorio
}
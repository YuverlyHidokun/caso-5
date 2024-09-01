import Auditorio from "../models/auditorio.js";
import mongoose, { mongo, Mongoose } from "mongoose";
import Conferencia from "../models/conferencia.js";
import Reserva from "../models/reserva.js"

const esObjectIdValido = (id) => mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === id; 

const crearReserva = async (req, res) => {
    const { codigo, descripcion, id_conferencia, id_auditorio } = req.body;

    if (Object.values(req.body).includes("")) {
        return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
    }

    const verificarCodigoBDD = await Reserva.findOne({ codigo });
    if (verificarCodigoBDD) {
        return res.status(400).json({ msg: "Lo sentimos, ese código ya se encuentra registrado" });
    }

    const permitidoCodigo = /^[A-Z0-9]+$/;
    if (!permitidoCodigo.test(codigo)) {
        return res.status(400).json({ msg: "El código solo puede contener mayúsculas y números" });
    }
    
    const verificarConferencia = await Conferencia.findById(id_conferencia);
    if (!verificarConferencia) {
        return res.status(400).json({ msg: "No se encontró la Conferencia" });
    }

    for (let id of id_auditorio) {

        if (!esObjectIdValido(id)) {
            return res.status(400).json({ msg: `ID de auditorio no es válido: ${id}` });
        }
        const verificarAuditorio = await Auditorio.findById(id);
        if (!verificarAuditorio) {
            return res.status(400).json({ msg: `No se encontró el técnico con id: ${id}` });
        }
    }

    try {
        const nuevaReserva = new Reserva(req.body);
        await nuevaReserva.save();
        res.status(201).json({ msg: "La Reserva fue creado con éxito" });
    } catch (error) {
        console.error("Error al crear la reserva:", error);
        res.status(500).json({ msg: "Hubo un error al crear el ticket" });
    }
};

const VerReserva = async (req, res) => {
    try {
        const reserva = await Reserva.find().select("-createdAt -updatedAt -__v");
        res.json(reserva);
    } catch (error) {
        console.error("Error al obtener las reservas:", error);
        res.status(500).json({ msg: "Lo sentimos, ocurrió un error", error });
    }
};

const detalleReserva = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: "Lo sentimos, no se encuentra registrado el ticket con ese id" });
    }
    try {
        const reserva = await Reserva.findById(id).select("-createdAt -updatedAt -__v");
        if (!reserva) {
            return res.status(404).json({ msg: "Reserva no encontrado" });
        }
        res.status(200).json(reserva);
    } catch (error) {
        console.error("Error al obtener la reserva:", error);
        res.status(500).json({ msg: "Lo sentimos, ocurrió un error", error });
    }
};

const ActualizarReserva = async (req, res) => {
    const { id } = req.params;

    if (Object.values(req.body).includes("")) {
        return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Lo sentimos, no se encuentra un ticket registrado con ese id" });
    }

    try {
        const resultado = await Reserva.findByIdAndUpdate(id, req.body, { new: true });
        if (!resultado) {
            return res.status(404).json({ msg: "Reserva no encontrada" });
        }
        res.status(200).json({ msg: "La Reserva fue actualizado con éxito", reserva: resultado });
    } catch (error) {
        console.error("Error al actualizar la reserva:", error);
        res.status(500).json({ msg: "Hubo un error al actualizar la reserva" });
    }
};

const EliminarReserva = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Lo sentimos, no existe una Reserva registrado con ese id" });
    }

    try {
        const resultado = await Reserva.findByIdAndDelete(id);
        if (!resultado) {
            return res.status(404).json({ msg: "Reserva no encontrada" });
        }
        res.status(200).json({ msg: "La reserva fue eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la reserva:", error);
        res.status(500).json({ msg: "Hubo un error al eliminar la reserva" });
    }
};


export{
    crearReserva,
    VerReserva,
    detalleReserva,
    ActualizarReserva,
    EliminarReserva
}
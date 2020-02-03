const express = require('express');
const router = express.Router();

//Importar el modelo de Persona
import Persona from '../models/Persona';
import { modelNames } from 'mongoose';

//Agregar
router.post('/new-persona', async(req, res) => {

    const body = req.body;

    try {

        const personaDB = await Persona.create(body);
        //se espera una "promesa", hace referencia a la peticion solicitada a servidor.
        //await, es funciones asincronas (async) esta expresion pausa el proceso
        //hasta que se reciba o rechace la promesa.

        //Importante, si la recepcion de status, la peticion se mantiene a la espera indeterminadamente
        res.status(200).json(personaDB);
        

    } catch (error) {
        return res.status(500).json({
            mensaje: "Algo fallo",
            error
        });
        //error 500, falla con el servidor
    }

});

//Busqueda por id
router.get('/persona/:id', async(req, res) => {
    const _id = req.params.id;

    try {

        const personaDB = await Persona.findOne({ _id });
        res.status(200).json(personaDB);

    } catch (error) {
        return res.status(400).json({
            mensaje: 'Algo Fallo',
            error
        });
    }
});

//Obtener todo los documentos
router.get('/personas', async(req, res) => {
    try {
        
        const personaDB = await Persona.find();
        res.json(personaDB);
        //por defecto se envia una respuesta tipo 200
        
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Algo Fallo',
            error
        });
    }
})

//Eliminar documento especifico
router.delete('/persona/:id', async(req, res) => {
    const _id = req.params.id;
    try {
        const personaDB = await Persona.findByIdAndDelete({ _id });
        if(!personaDB){
            return res.status(400).json({
                mensaje: 'No se encuentra el ID'
            });
        }
        res.json(personaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Algo Fallo',
            error
        });
    }
});

//Actualizar Documento especifico
router.put('/persona/:id', async(req, res) => {
    const _id = req.params.id;
    const body = req.body;

    try {
        
        const personaDB = await Persona.findByIdAndUpdate({_id}, body, {new: true});
        if(!personaDB){
            return res.status(400).json({
                mensaje: 'No se encuentra el ID'
            });
        }
        res.json(personaDB);

    } catch (error) {
        return res.status(400).json({
            mensaje: 'Algo Fallo',
            error
        });
    }
})

module.exports = router;
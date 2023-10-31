import { Router } from "express";
import { getEvents, createEvent, updateEvent, deleteEvent } from "../controllers/events.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { check } from "express-validator";
import { validarCampos } from '../middlewares/validar-campos.js';
import { isDate } from "../helpers/isDate.js";

const routerEvents = Router();

routerEvents.use(validarJWT);

routerEvents.get('/', getEvents);

routerEvents.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ], 
    createEvent
);

routerEvents.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    updateEvent
);

routerEvents.delete('/:id', deleteEvent);



export default routerEvents;
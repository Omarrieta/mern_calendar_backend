import { check } from 'express-validator'
import { Router } from "express"
import { crearUsuario, loginUsuario, revalidarToken } from "../controllers/auth.js";
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const routerAuth = Router();

routerAuth.post(
    '/new', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ], 
    crearUsuario
);

routerAuth.post(
    '/',
    [
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario
);

routerAuth.get('/renew', validarJWT, revalidarToken);

export default routerAuth;

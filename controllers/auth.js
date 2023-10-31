import { Usuario } from "../models/Usuario.js";
import bcrypt from 'bcryptjs';
import { generarJWT } from "../helpers/jwt.js";

export const crearUsuario = async(req, res) => {
    
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if(usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese email'
            });
        }

        usuario = new Usuario(req.body);

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generarJWT(usuario.id, usuario.name);
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        });
    }
         
};

export const loginUsuario = async(req, res) =>{
    
    const { email , password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });

        if(!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El email no existe'
            });
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        });
    }
    
};

export const revalidarToken= async(req, res) =>{

    const { uid, name } = req;

    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token
    });
};

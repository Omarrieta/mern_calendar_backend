import { Evento } from "../models/Evento.js";

export const getEvents = async(req , res) => {
    
    const events = await Evento.find()
                               .populate('user', 'name');
    
    
    res.json({
        ok: true,
        events
    });
        
};

export const createEvent = async(req, res) => {
    
   const evento = new Evento(req.body);

   try {
        
        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        });


   } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
   }
    
}

export const updateEvent = async(req, res) => {
    
    const eventoId = req.params.id;

    try {
       
        const evento = await Evento.findById(eventoId);
        const uid = req.uid;

        if(!evento){
            res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese id'
            });
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No esta autorizado para editar este evento'
            });
        }

        const newEvento = {
            ...req.body,
            user: uid
        }

        const eventoUpdate = await Evento.findByIdAndUpdate(eventoId, newEvento, { new: true });

        res.json({
            ok: true,
            evento: eventoUpdate
        });
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }

}

export const deleteEvent = async(req, res) => {
    
    const eventoId = req.params.id;

    try {
        const evento = await Evento.findById(eventoId);
        const uid = req.uid;

        if(!evento){
            res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese id'
            });
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No esta autorizado para eliminar este evento'
            });
        }

        await Evento.findByIdAndDelete(eventoId);

        res.json({
            ok: true,
            msg: 'Evento eliminado',
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
    
}
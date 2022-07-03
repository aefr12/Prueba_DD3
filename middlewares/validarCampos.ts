import { validationResult } from 'express-validator';

const validarCampos = (req:any,res:any,next:any) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.json(errors);
    }

    next();
}

export default validarCampos;
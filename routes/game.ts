import { Router } from "express";
import { check } from "express-validator";
import { ObtienePalabra, ComparaPalabra, MuestraResultados, MuestraMejores, PalabrasAcertadas } from '../controllers/Game';
import validaJWT from "../middlewares/validarJWT";
import validarCampos from '../middlewares/validarCampos';
import existeUsuario from '../helpers/existeUsuario';


const router = Router();

router.post('/obtienePalabra',[
    check('username','El nombre es obligatorio').not().isEmpty(),
    check('username').custom(existeUsuario),
    validarCampos
],ObtienePalabra);

router.post('/comparaPalabra',[
    validaJWT,
    check('palabra','Ingresa una palabra').not().isEmpty(),
    validarCampos
],ComparaPalabra);

router.get('/muestraResultados',[
    validaJWT
],MuestraResultados);

router.get('/muestraMejores',[
    validaJWT
],MuestraMejores);

router.get('/palabrasAcertadas',[
    validaJWT
],PalabrasAcertadas);


export default router;
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const Game_1 = require("../controllers/Game");
const validarJWT_1 = __importDefault(require("../middlewares/validarJWT"));
const validarCampos_1 = __importDefault(require("../middlewares/validarCampos"));
const existeUsuario_1 = __importDefault(require("../helpers/existeUsuario"));
const router = (0, express_1.Router)();
router.post('/obtienePalabra', [
    (0, express_validator_1.check)('username', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('username').custom(existeUsuario_1.default),
    validarCampos_1.default
], Game_1.ObtienePalabra);
router.post('/comparaPalabra', [
    validarJWT_1.default,
    (0, express_validator_1.check)('palabra', 'Ingresa una palabra').not().isEmpty(),
    validarCampos_1.default
], Game_1.ComparaPalabra);
router.get('/muestraResultados', [
    validarJWT_1.default
], Game_1.MuestraResultados);
router.get('/muestraMejores', [
    validarJWT_1.default
], Game_1.MuestraMejores);
router.get('/palabrasAcertadas', [
    validarJWT_1.default
], Game_1.PalabrasAcertadas);
exports.default = router;

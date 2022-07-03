"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PalabrasAcertadas = exports.MuestraMejores = exports.MuestraResultados = exports.ComparaPalabra = exports.ObtienePalabra = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const palabra_1 = __importDefault(require("../models/palabra"));
const actual_1 = __importDefault(require("../models/actual"));
const usuario_1 = __importDefault(require("../models/usuario"));
const generaJWT_1 = __importDefault(require("../helpers/generaJWT"));
node_cron_1.default.schedule('*/5 * * * *', () => {
    seleccionaPalabra();
}, {
    scheduled: true,
    timezone: "America/Monterrey"
});
const ObtienePalabra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    let palabra = yield actual_1.default.findAll();
    let usuario = new usuario_1.default();
    usuario.nombre = username;
    usuario.intentos = 0;
    usuario.victorias = 0;
    usuario.save();
    const token = yield (0, generaJWT_1.default)(username);
    return res.json({
        palabraEnturno: palabra[0].dataValues.actual,
        token,
        status: true
    });
});
exports.ObtienePalabra = ObtienePalabra;
const ComparaPalabra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { palabra } = req.body;
    const actual = yield actual_1.default.findAll();
    let respuestas = [];
    if (palabra.toLowerCase() === actual[0].dataValues.actual) {
        yield usuario_1.default.update({
            victorias: req.usuario.dataValues.victorias + 1,
            intentos: 0
        }, {
            where: {
                id: req.usuario.dataValues.id
            }
        });
        const acertada = yield palabra_1.default.findOne({ where: { palabra: actual[0].dataValues.actual } });
        yield palabra_1.default.update({
            acertada: acertada.dataValues.acertada + 1
        }, {
            where: {
                id: acertada.dataValues.id
            }
        });
        return res.json({
            msg: `Palabra acertada: ${actual[0].dataValues.actual}`,
            status: true
        });
    }
    const palabraSeparada = palabra.toLowerCase().split('');
    const actualSeparada = actual[0].dataValues.actual.toLowerCase().split('');
    if (req.usuario.dataValues.intentos == 5) {
        return res.json({
            msg: 'No acertaste la palabra',
            status: false
        });
    }
    for (let x = 0; x < palabraSeparada.length; x++) {
        if (palabraSeparada[x] == actualSeparada[x]) {
            respuestas.push({
                letter: palabraSeparada[x],
                value: 1
            });
            yield usuario_1.default.update({
                intentos: req.usuario.dataValues.intentos + 1
            }, {
                where: {
                    id: req.usuario.dataValues.id
                }
            });
        }
        if (actual[0].dataValues.actual.toLowerCase().indexOf(palabraSeparada[x]) != -1) {
            respuestas.push({
                letter: palabraSeparada[x],
                value: 2
            });
            yield usuario_1.default.update({
                intentos: req.usuario.dataValues.intentos + 1
            }, {
                where: {
                    id: req.usuario.dataValues.id
                }
            });
        }
    }
    // console.log(usuario);
    return res.json({
        answer: respuestas,
        status: true
    });
});
exports.ComparaPalabra = ComparaPalabra;
const MuestraResultados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    const partidas = yield usuario_1.default.findOne({ where: { nombre: username } });
    return res.json({
        victorias: partidas[0].dataValues.victorias,
        usuario: partidas[0].dataValues.nombre,
        status: true
    });
});
exports.MuestraResultados = MuestraResultados;
const MuestraMejores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listaMejores = yield usuario_1.default.findAll();
    listaMejores.sort(function (a, b) {
        return b.dataValues.victorias - a.dataValues.victorias;
    });
    let mejores = listaMejores.splice(0, 11);
    return res.json({
        mejores,
        status: true
    });
});
exports.MuestraMejores = MuestraMejores;
const PalabrasAcertadas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const masAcertadas = yield palabra_1.default.findAll();
    masAcertadas.sort(function (a, b) {
        return b.dataValues.acertada - a.dataValues.acertada;
    });
    let lista = masAcertadas.splice(0, 100);
    return res.json({
        masAcertadas: lista,
        status: true
    });
});
exports.PalabrasAcertadas = PalabrasAcertadas;
function seleccionaPalabra() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Seleccionando Palabra");
        let palabraActual;
        try {
            let usuarios = yield usuario_1.default.findAll();
            for (let x = 0; x < usuarios.length; x++) {
                yield usuario_1.default.update({
                    intentos: 0
                }, {
                    where: {
                        id: usuarios[x].dataValues.id
                    }
                });
            }
            let listaPalabras = yield palabra_1.default.findAll({
                where: {
                    mostrada: false
                }
            });
            let palabra = Math.floor(Math.random() * listaPalabras.length);
            yield palabra_1.default.update({
                mostrado: true
            }, {
                where: {
                    id: listaPalabras[palabra].dataValues.id,
                }
            });
            let existeActual = yield actual_1.default.findAll();
            if (existeActual.length > 0) {
                yield existeActual.update({
                    palabra: listaPalabras[palabra].dataValues.palabra
                }, {
                    where: {
                        id: existeActual[0].dataValues.id
                    }
                });
            }
            else {
                palabraActual = yield new actual_1.default();
                palabraActual.id = 1;
                palabraActual.actual = listaPalabras[palabra].dataValues.palabra;
            }
            palabraActual.save();
            console.log("Palabra Seleccionada");
            return true;
        }
        catch (err) {
            return false;
        }
    });
}

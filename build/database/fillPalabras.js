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
exports.FillPalabras = void 0;
const diccionario_1 = __importDefault(require("../models/diccionario"));
const palabra_1 = __importDefault(require("../models/palabra"));
const FillPalabras = () => __awaiter(void 0, void 0, void 0, function* () {
    const fills = yield palabra_1.default.findAll();
    if (fills.length > 0) {
        return;
    }
    const diccionario = yield diccionario_1.default.findAll();
    let nuevasPalabras = diccionario.filter((item) => item.dataValues.palabra.length == 5);
    for (let x = 0; x < nuevasPalabras.length; x++) {
        let dato = yield new palabra_1.default();
        dato.id = x + 1;
        dato.palabra = nuevasPalabras[x].dataValues.palabra;
        dato.acertada = 0;
        dato.mostrada = false;
        dato.save();
    }
    return console.log('Diccionario de palabras creado correctamente');
});
exports.FillPalabras = FillPalabras;

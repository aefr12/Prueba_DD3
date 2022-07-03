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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = __importDefault(require("../models/usuario"));
const validaJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('Token-Prueba');
    if (!token) {
        return res.status(500).json({
            msg: 'El token no es valido'
        });
    }
    try {
        const dataToken = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'Token_prueba');
        const usuario = yield usuario_1.default.findOne({
            where: {
                nombre: dataToken.username
            }
        });
        if (!usuario) {
            return res.status(400).json({
                msg: 'El token es invalido'
            });
        }
        req.usuario = usuario;
        return next();
    }
    catch (err) {
        return res.status(400).json({
            msg: 'El token no es valido'
        });
    }
});
exports.default = validaJWT;

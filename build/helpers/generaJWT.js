"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (username = '') => {
    return new Promise((resolve, reject) => {
        const payload = { username };
        jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY || 'Token_prueba', {
            expiresIn: '1d'
        }, (err, token) => {
            if (err) {
                reject('No se pudo generar el token');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.default = generateJWT;

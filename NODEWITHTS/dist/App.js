"use strict";
// import express from 'express';
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
// const app = express();
// app.get('/', (req, res) => { 
//     res.send('Hello world this is first project of Node With Typescript ');
// })
// app.listen(7000, () => {
//     console.log('listening on port 7000');
// })
const connection_1 = __importDefault(require("./databaseconfig/connection"));
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connection_1.default.initialize();
            console.log('Data Source has been initialized!');
        }
        catch (error) {
            console.error('Error during Data Source initialization:', error);
        }
    });
}
initialize();

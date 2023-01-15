"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// import { getRepository } from "typeorm";
// import { validate } from "class-validator";
// import { stringify } from "querystring";
const client_1 = require("@prisma/client");
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const crypt_services_1 = require("../services/crypt.services");
const prisma = new client_1.PrismaClient();
class AuthController {
}
_a = AuthController;
AuthController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Check if username and password are set
    let { userEmail, password } = req.body;
    if (!(userEmail || password)) {
        res.status(400).send({ message: "missing_required_parameter", info: "email or password" });
    }
    // +> create a test with a email null send 504 
    //Get user from database
    const userRepository = yield prisma.user.findUniqueOrThrow({
        where: {
            email: userEmail
        }
    });
    let user;
    let count = Object.keys(userRepository).length;
    if (count > 0) {
        try {
            user = userRepository;
        }
        catch (error) {
            res.status(401).send(error);
        }
        //Check if encrypted password match
        if (!(0, crypt_services_1.checkIfUnencryptedPasswordIsValid)(password, user)) {
            res.status(401).send();
        }
        /* On créer le token CSRF */
        // const xsrfToken = bcrypt.encodeBase64(64).toString('hex');
        //Sing JWT, valid for 1 hour
        const accessToken = jwt.sign({ userId: user.id, userEmail: user.email }, config_1.default.jwtSecret, { expiresIn: "1h" });
        //Send the jwt in the response
        res.send(accessToken);
    }
    else {
        res.status(404).send('No user in database');
    }
});
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map
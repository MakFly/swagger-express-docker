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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// import { validate } from "class-validator";
const client_1 = require("@prisma/client");
const crypt_services_1 = require("../services/crypt.services");
const prisma = new client_1.PrismaClient();
class UserController {
}
_a = UserController;
UserController.listAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Get users from database
    const users = yield prisma.user.findMany();
    //Send the users object
    res.send(users);
});
// static getOneById = async (req: Request, res: Response) => {
//     //Get the ID from the url
//     const id: number = req.params.id;
//     //Get the user from database
//     const userRepository = getRepository(User);
//     try {
//         const user = await userRepository.findOneOrFail(id, {
//             select: ["id", "username", "role"] //We dont want to send the password on response
//         });
//     } catch (error) {
//         res.status(404).send("User not found");
//     }
// };
UserController.newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Get parameters from the body
    let { userEmail, password, role } = req.body;
    let user;
    user = {
        email: userEmail,
        password: password,
        role: role
    };
    //Validade if the parameters are ok
    // const errors = await validate(user);
    // if (errors.length > 0) {
    //     res.status(400).send(errors);
    //     return;
    // }
    //Hash the password, to securely store on DB
    (0, crypt_services_1.hashPassword)(user);
    //Try to save. If fails, the email is already in use
    try {
        const createUser = yield prisma.user.create({ data: user });
    }
    catch (e) {
        console.log(e);
        res.status(409).send("email already in use");
        return;
    }
    //If all ok, send 201 response
    res.status(201).send("User created");
});
;
exports.default = UserController;
//# sourceMappingURL=UserController.js.map
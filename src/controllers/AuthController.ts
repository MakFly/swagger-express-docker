// import { getRepository } from "typeorm";
// import { validate } from "class-validator";
// import { stringify } from "querystring";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { User } from "../models/User";
import { checkIfUnencryptedPasswordIsValid } from "../services/crypt.services";
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

class AuthController {
    static login = async (req: Request, res: Response) => {
        //Check if username and password are set
        let { userEmail, password } = req.body;
        if (!(userEmail || password)) {
            res.status(400).send({ message: "missing_required_parameter", info: "email or password" });
        }

        // +> create a test with a email null send 504 

        //Get user from database
        const userRepository = await prisma.user.findUniqueOrThrow({
            where: {
                email: userEmail
            }
        });
        let user: User;

        let count = Object.keys(userRepository).length;
        if (count > 0) {
            try {
                user = userRepository;
            } catch (error) {
                res.status(401).send(error);
            }

            //Check if encrypted password match
            if (!checkIfUnencryptedPasswordIsValid(password, user)) {
                res.status(401).send();
            }

            /* On créer le token CSRF */
            // const xsrfToken = bcrypt.encodeBase64(64).toString('hex');

            //Sing JWT, valid for 1 hour
            const accessToken = jwt.sign(
                { userId: user.id, userEmail: user.email },
                config.jwtSecret,
                { expiresIn: "1h" }
            );

            //Send the jwt in the response
            res.send(accessToken);
        } else {
            res.status(404).send('No user in database');
        }

    };

    // static changePassword = async (req: Request, res: Response) => {
    //     //Get ID from JWT
    //     const id = res.locals.jwtPayload.userId;

    //     //Get parameters from the body
    //     const { oldPassword, newPassword } = req.body;
    //     if (!(oldPassword && newPassword)) {
    //         res.status(400).send();
    //     }

    //     //Get user from the database
    //     const userRepository = getRepository(User);
    //     let user: User;
    //     try {
    //         user = await userRepository.findOneOrFail(id);
    //     } catch (id) {
    //         res.status(401).send();
    //     }

    //     //Check if old password matchs
    //     if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
    //         res.status(401).send();
    //         return;
    //     }

    //     //Validate de model (password lenght)
    //     user.password = newPassword;
    //     const errors = await validate(user);
    //     if (errors.length > 0) {
    //         res.status(400).send(errors);
    //         return;
    //     }
    //     //Hash the new password and save
    //     user.hashPassword();
    //     userRepository.save(user);

    //     res.status(204).send();
    // };
}
export default AuthController;
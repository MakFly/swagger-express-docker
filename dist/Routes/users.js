"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const checkJwt_1 = require("../middleware/checkJwt");
const checkRole_1 = require("../middleware/checkRole");
const router = (0, express_1.Router)();
//Get all users
router.get("/", [checkJwt_1.checkJwt, (0, checkRole_1.checkRole)(["ADMIN"])], UserController_1.default.listAll);
// Get one user
// router.get(
//     "/:id([0-9]+)",
//     [checkJwt, checkRole(["ADMIN"])],
//     UserController.getOneById
// );
//Create a new user
router.post("/", UserController_1.default.newUser);
//Edit one user
// router.patch(
//     "/:id([0-9]+)",
//     [checkJwt, checkRole(["ADMIN"])],
//     UserController.editUser
// );
// //Delete one user
// router.delete(
//     "/:id([0-9]+)",
//     [checkJwt, checkRole(["ADMIN"])],
//     UserController.deleteUser
// );
exports.default = router;
//# sourceMappingURL=users.js.map
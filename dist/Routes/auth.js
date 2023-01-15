"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const router = (0, express_1.Router)();
//Login route
router.post("/login", AuthController_1.default.login);
//Change my password
// router.post("/change-password", [checkJwt], AuthController.changePassword);
exports.default = router;
//# sourceMappingURL=auth.js.map
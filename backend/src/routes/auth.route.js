import express from 'express';
// 1. Added .js extension
// 2. Used named imports to match your 'export const' in the controller
import { register, login, logout } from '../controllers/auth.controller.js';

const router = express.Router();


router.post("/signup", register);


router.post("/login", login);

router.post("/logout", logout);

export default router;
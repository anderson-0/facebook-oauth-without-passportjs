import { Router, Request, Response } from "express";

import { AuthenticateUserController } from "./controllers/AuthenticateUserController";

const router = Router();

const authenticateUserController = new AuthenticateUserController();

router.get('/facebook/signin', authenticateUserController.signin);

router.get('/facebook/callback', authenticateUserController.callback);

router.get('/facebook/user', authenticateUserController.getUserInfo);

export { router };
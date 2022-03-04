import { Request, Response } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';


class AuthenticateUserController {
  async signin(req: Request, res: Response) {
    const url = `${process.env.FACEBOOK_OAUTH_URL}?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.FACEBOOK_CALLBACK_URL}&auth_type=rerequest`;
    res.redirect(url);
  }

  async callback(req: Request, res: Response) {
    const code = req.query.code as string;
    const authenticateUser = new AuthenticateUserService();

    try {
      const response = await authenticateUser.getAccessToken(code);

      // Here instead should redirect the user to some protected page because the user is authenticated now
      return res.json(response);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }    
  }

  async getUserInfo(req: Request, res: Response) {
    const id = req.query.id as string;
    const authenticateUser = new AuthenticateUserService();
    try {
      const response = await authenticateUser.getUserInfo(id);
      return res.json(response);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export { AuthenticateUserController }
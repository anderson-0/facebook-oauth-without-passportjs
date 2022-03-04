import axios from 'axios';
import prismaClient from '../prisma';
import { sign } from 'jsonwebtoken';
 
interface IAccessTokenResponse {
  access_token: string;
}

interface IMeResponse {
  id: string;
  name: string;
}

class AuthenticateUserService {
  async getAccessToken(code: string) {
    const url = `${process.env.FACEBOOK_ACCESS_TOKEN_URL}?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.FACEBOOK_CALLBACK_URL}&client_secret=${process.env.FACEBOOK_SECRET}&code=${code}`

    // Destructuring response nested object to get only the access token
    const {data: { access_token} } = await axios.post<IAccessTokenResponse>(url);
    const urlUser = `${process.env.FACEBOOK_CHECK_USER_URL}?access_token=${access_token}`;
    
    const { data: { id } } = await axios.get<IMeResponse>(urlUser);
    
    let user = await prismaClient.user.findFirst({
      where: {
        id
      }
    });

    if (!user) {
      
      // Saves access_token in the database as recommended in the official docs https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow
      user = await prismaClient.user.create({
        data: {
          id: id as string,
          access_token: access_token as string
        }
      })
    }

    // Generates JWT Token passing user info as payload
    const token = sign(
      {
        user: {
          id
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: process.env.JWT_EXPIRATION
      }
    )

    // Returning both JWT Token as the user data containing the access_token
    // In Production, the access_token should be stored in a secure way
    return {
      token,
      user
    };
  }

  async getUserInfo(id: string) {
    let user = await prismaClient.user.findFirst({
      where: {
        id
      }
    });

    if (!user) {
      throw new Error("Invalid User ID");
    }
    return user;
  }
}

export { AuthenticateUserService }
import {sign, verify} from "jsonwebtoken";

export class AuthService {

  createToken(userId: string): string {
    return sign({data: userId}, "theEncryptKey", {expiresIn: 24 * 60 * 60});
  }

  async decryptToken(token: string): Promise<string | object> {
    return await verify(token, "theEncryptKey");
  }

}

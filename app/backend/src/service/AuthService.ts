import * as jwt from 'jsonwebtoken';
import { readFile } from 'fs/promises';
import { compare } from 'bcryptjs';
import User from '../database/models/User';
import IAuth from '../Interfaces/Auth';
import IAuthVerify from '../Interfaces/AuthVerify';

export default class AuthService {
  private _secret: string;

  constructor() {
    this.secret();
  }

  private async secret() {
    const SECRET = await readFile('jwt.evaluation.key', 'utf8');

    this._secret = SECRET;
  }

  async auth(email: string, pass: string): Promise<null | IAuth> {
    const user = await User.findOne({ where: { email } });

    if (!user) return null;

    const dataUser = {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    };

    const isValidPass = await compare(pass, user.password);

    if (!isValidPass) return null;

    const signOptions: jwt.SignOptions = { algorithm: 'HS256', expiresIn: '1d' };

    const token = jwt.sign({ data: dataUser }, this._secret, signOptions);

    return { user: dataUser, token };
  }

  verify(token: string) {
    try {
      const result = jwt.verify(token, this._secret);
      const { data: { role } } = result as IAuthVerify;

      return role;
    } catch (error) {
      return false;
    }
  }
}

import * as jwt from 'jsonwebtoken';
import { readFile } from 'fs/promises';
import { compare } from 'bcryptjs';
import User from '../database/models/User';
import IAuth from '../Interfaces/Auth';

export default class AuthService {
  static async auth(email: string, pass: string): Promise<null | IAuth> {
    const SECRET = await readFile('jwt.evaluation.key', 'utf8');

    const user = await User.findOne({ where: { email } });

    if (!user) return null;

    const dataUser = {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    };

    const isValidPass = await compare(pass, user.password);
    // const isValidPass = user.password === pass;

    if (!isValidPass) return null;

    const signOptions: jwt.SignOptions = { algorithm: 'HS256', expiresIn: '1d' };

    const token = jwt.sign({ data: dataUser }, SECRET, signOptions);

    return { user: dataUser, token };
  }
}

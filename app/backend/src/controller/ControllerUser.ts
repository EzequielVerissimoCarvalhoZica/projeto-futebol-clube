import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import User from '../database/models/User';
// import * as jwt from 'jsonwebtoken';

export default class ControllerUser {
  findUser = async (res: Response, req: Request) => {
    const { email, password } = req.body;

    if (!email) return res.status(401).json({ message: 'email is required' });
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(401).json({ message: 'wrong email' });

    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) return res.status(401).json({ message: 'wrong password' });

    return res.status(200).json({ message: 'successfully logged in' });
  };
}

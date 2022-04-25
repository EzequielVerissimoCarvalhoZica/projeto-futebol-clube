import IUser from './User';

export default interface AuthVerify {
  data: IUser;
  iat: number,
  exp: number
}

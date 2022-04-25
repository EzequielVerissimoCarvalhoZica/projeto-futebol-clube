import IUser from './User';

export default interface IAuthVerify {
  data: IUser;
  iat: number,
  exp: number
}

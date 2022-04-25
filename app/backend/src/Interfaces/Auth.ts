import IUser from './User';

export default interface IAuth {
  user: IUser;
  token: string;
}

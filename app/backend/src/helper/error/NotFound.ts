import HttpException from './HttpException';

export default class NotFound extends HttpException {
  public httpCode: number;

  public name: string;

  constructor(message: string, httpCode = 400) {
    super(message);

    this.httpCode = httpCode;
    this.name = 'NotFound';
  }
}

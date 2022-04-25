import HttpException from './HttpException';

export default class HttpErrorStatusCode extends HttpException {
  public httpCode: number;

  constructor(message: string, httpCode = 400) {
    super(message);

    this.httpCode = httpCode;
  }
}

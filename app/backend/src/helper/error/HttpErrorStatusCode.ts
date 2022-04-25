import HttpException from './HttpException';

export default class HttpErrorStatusCode extends HttpException {
  protected httpCode: number;

  constructor(message: string, httpCode = 400) {
    super(message);

    this.httpCode = httpCode;
  }
}

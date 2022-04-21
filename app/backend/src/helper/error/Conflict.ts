import HttpError from './HttpError';

export default class Conflict extends HttpError {
  public httpCode: number;

  public name: string;

  constructor(message: string, httpCode = 400) {
    super(message);

    this.httpCode = httpCode;
    this.name = 'Conflict';
  }
}

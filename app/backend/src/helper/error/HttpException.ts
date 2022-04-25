export default abstract class HttpException extends Error {
  public httpCode: number;

  public name: string;
}

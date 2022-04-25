export default abstract class HttpException extends Error {
  protected httpCode: number;

  public name: string;
}

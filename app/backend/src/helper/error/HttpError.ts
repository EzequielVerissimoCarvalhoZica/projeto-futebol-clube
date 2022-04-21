export default abstract class HttpError extends Error {
  public httpCode: number;

  public name: string;
}

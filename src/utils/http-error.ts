export type HttpExceptionError = {
  code: number;
  message: string;
  details?: any;
};

export class HttpException extends Error {
  private code: number;
  private details?: any;

  constructor(code: number, message: string, details?: any) {
    super();
    this.code = code;
    this.message = message;
    this.details = details;
  }

  get _code() {
    return this.code;
  }
  get _details() {
    return this.details;
  }
}

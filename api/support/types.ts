export interface requestDataType {
  url: string;
  body?: any;
  headers?: any;
}

export enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

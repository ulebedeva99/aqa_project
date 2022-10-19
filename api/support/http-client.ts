import axios from "axios";
import http from "http";
import https from "https";
import { METHODS, requestDataType } from "./types";
import * as AxiosLogger from "axios-logger";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
});

const loggerConfig = {
  prefixText: "info",
  dateFormat: "HH:MM:ss",
};

instance.interceptors.request.use((request) => {
  return AxiosLogger.requestLogger(request, loggerConfig);
});

instance.interceptors.response.use(
  (response) => {
    return AxiosLogger.requestLogger(response, loggerConfig);
  },
  (error) => {
    return AxiosLogger.errorLogger(error, {
      ...loggerConfig,
      prefixText: "error",
    });
  }
);

class Client {
  public async request(method: METHODS, data: requestDataType) {
    const { url, body, headers } = data;
    switch (method) {
      case METHODS.GET:
        return instance.get(url, { headers });
      case METHODS.POST:
        return instance.post(url, body, { headers });
      case METHODS.PUT:
        return instance.put(url, body, { headers });
      case METHODS.PATCH:
        return instance.patch(url, body, { headers });
      case METHODS.DELETE:
        return instance.delete(url, { headers });
      default:
        throw new Error("Please provide a valid method name!");
    }
  }
}

export const client = new Client();

// @ts-ignore
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpInterface } from "../index";
import ErrorHandler from "./error-handler";

class Interceptor {
  public static request(httpInstance: HttpInterface): void {
    httpInstance.getAxiosInstance().interceptors.request.use(
      //@ts-ignore
      async (config: AxiosRequestConfig) => {
        const queryConfig: AxiosRequestConfig = config;

        return queryConfig;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }

  public static response(httpInstance: HttpInterface): void {
    httpInstance.getAxiosInstance().interceptors.response.use(
      async (response: AxiosResponse) => {
        return response;
      },
      async (error: AxiosError) => {
        const errorHandler = new ErrorHandler(
          httpInstance.getIgnoredErrors(),
          error.response?.request
        );
        let handlerWasUsed = true;

        try {
          handlerWasUsed = await errorHandler.handle();
        } catch {
          await Promise.resolve();
        }

        if (error.response && error.response.status >= 400) {
          if (typeof error.response.data === "string") {
            error.response.data = {
              message: error.response.data,
            };
          }

          error.response.data = {
            // @ts-ignore
            ...error.response.data,
            handlerWasUsed,
          };

          return Promise.reject(error.response);
        }
        return Promise.resolve(error.response);
      }
    );
  }
}

export default Interceptor;

// @ts-ignore
import axios, { AxiosInstance, ResponseType } from "axios";
import Interceptors from "./interceptor";
// @ts-ignore
import qs from "qs";
// @ts-ignore
import { serialize } from "object-to-formdata";

export interface HttpInterface {
  get(url: string, params: object): Promise<any>;

  delete(url: string, params: object): Promise<any>;

  patch(url: string, params: object): Promise<any>;

  post(url: string, params: object): Promise<any>;

  put(url: string, params: object): Promise<any>;

  ignoreErrorHandler(...errors: Array<number>): HttpInterface;

  ignoreGlobalPreloader(): HttpInterface;

  useFormData(): HttpInterface;

  getAxiosInstance(): AxiosInstance;

  getIgnoredErrors(): Array<number>;

  getPreloaderState(): boolean;
}

class Http implements HttpInterface {
  private readonly axios: AxiosInstance;
  private ignoredErrors: Array<number>;
  private ignorePreloader: boolean;
  private formData: boolean;
  private requestType: ResponseType;

  constructor() {
    this.axios = axios.create({
      baseURL: "/api/",
    });
    this.ignoredErrors = [];
    this.ignorePreloader = false;
    this.formData = false;
    this.requestType = "json";

    Interceptors.request(this);
    Interceptors.response(this);
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axios;
  }

  public getIgnoredErrors(): Array<number> {
    return this.ignoredErrors;
  }

  public getPreloaderState(): boolean {
    return this.ignorePreloader;
  }

  public async get(url: string, params: object = {}): Promise<any> {
    try {
      const response = await this.axios.get(url, {
        params,
        //@ts-ignore
        paramsSerializer: (params: any) => {
          return qs.stringify(params);
        },
        responseType: this.requestType,
      });
      return response.data;
    } catch (e: any) {
      throw e?.data;
    }
  }

  public async delete(url: string, data: object = {}): Promise<any> {
    try {
      const response = await this.axios.delete(url, { data });
      return response.data;
    } catch (e: any) {
      throw e?.data;
    }
  }

  public async patch(url: string, data: object): Promise<any> {
    try {
      const response = await this.axios.patch(url, data);
      return response.data;
    } catch (e: any) {
      throw e?.data;
    }
  }

  public async post(url: string, data: object): Promise<any> {
    let form = data;

    if (this.formData) {
      form = serialize(data, {
        indices: true,
        nullsAsUndefineds: true,
      });
    }

    try {
      const response = await this.axios.post(url, form);

      return response.data;
    } catch (e: any) {
      throw e?.data;
    }
  }

  public async put(url: string, data: object): Promise<any> {
    try {
      const response = await this.axios.put(url, data);
      return response.data;
    } catch (e: any) {
      throw e?.data;
    }
  }

  public ignoreGlobalPreloader(): HttpInterface {
    this.ignorePreloader = true;
    return this;
  }

  public useFormData(): HttpInterface {
    this.formData = true;
    return this;
  }

  public setResponseType(type: ResponseType): HttpInterface {
    this.requestType = type;
    return this;
  }

  public ignoreErrorHandler(...errors: Array<number>): HttpInterface {
    if (errors.length) {
      this.ignoredErrors = errors;
    } else {
      this.ignoredErrors = [
        301, 400, 401, 403, 404, 405, 408, 422, 426, 429, 500,
      ];
    }
    return this;
  }
}

export default Http;

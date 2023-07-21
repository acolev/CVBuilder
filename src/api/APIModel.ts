import Http from "./services/http";
import { getRandomInt, sleep } from "./utils";

export default class APIModel {
  protected readonly http = new Http();
  protected readonly resourceUrl: string;
  protected fake_get: any;
  protected fake_show: any;
  protected fake_post: any;
  protected fake_patch: any;
  protected fake_timeout: number = 3000;

  constructor(resourceUrl: string) {
    this.resourceUrl = resourceUrl;
  }

  async get(params = {}): Promise<any> {
    if (this?.fake_get) {
      await sleep(getRandomInt(this.fake_timeout));
      return this.fake_get;
    }
    return this.http
      .ignoreErrorHandler(this.fake_timeout)
      .ignoreGlobalPreloader()
      .get(`${this.resourceUrl}`, params);
  }

  async show(id: number | string): Promise<any> {
    if (this?.fake_show) {
      await sleep(getRandomInt(this.fake_timeout));
      return this.fake_show;
    }
    return this.http
      .ignoreErrorHandler(this.fake_timeout)
      .get(`${this.resourceUrl}/${id}`, {});
  }

  async post(payload: object): Promise<any> {
    if (this?.fake_post) {
      await sleep(getRandomInt(this.fake_timeout));
      return this.fake_post;
    }
    return this.http
      .ignoreErrorHandler(422)
      .post(`${this.resourceUrl}`, payload);
  }

  async patch(id: number, payload: object): Promise<any> {
    if (this?.fake_patch) {
      await sleep(getRandomInt(this.fake_timeout));
      return this.fake_patch;
    }
    return this.http
      .ignoreErrorHandler(422)
      .patch(`${this.resourceUrl}/${id}`, payload);
  }

  delete(id: number): Promise<any> {
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }

  deleteMany(params: object): Promise<any> {
    return this.http.delete(`${this.resourceUrl}`, params);
  }
}

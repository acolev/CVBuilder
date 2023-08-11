import APIModel from "../APIModel";

// @ts-ignore
import db from "./Models/resume";

export default class Resume extends APIModel {
  private db: any;
  constructor() {
    super("resume");
    this.db = new db();
  }

  async get(): Promise<any> {
    return await this.db.getAll();
  }

  async show(id: number): Promise<any> {
    return await this.db.find('id', id);
  }

  async post(payload: object): Promise<any> {
    return await this.db.insert(payload);
  }

  async patch(id: number, payload: object): Promise<any> {
    return await this.db.update(id, payload);
  }
}

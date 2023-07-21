import APIModel from "../APIModel";
import fakeUsers from "./fake/users";

export default class Users extends APIModel {
  constructor() {
    super("users");
    this.fake_get = {
      users: fakeUsers,
      total: fakeUsers.length,
    };
  }
}

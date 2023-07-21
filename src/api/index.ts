import Auth from "./modules/Auth";
import Users from "./modules/Users";

export default {
  auth: () => new Auth(),
  users: () => new Users(),
};

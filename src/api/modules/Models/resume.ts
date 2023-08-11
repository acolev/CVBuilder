// @ts-ignore
import db from "@/plugins/wdb";

export default class DB_USERS extends db {
  constructor() {
    super("cv_builder", "resume");
  }

}

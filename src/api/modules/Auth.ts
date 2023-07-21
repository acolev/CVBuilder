import APIModel from "../APIModel";
import Users from "./fake/users";

export default class Auth extends APIModel {
  constructor() {
    super("jwt");
  }

  login(payload = {}) {
    return {
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiQXR0YXIiLCJpYXQiOjE2NTczMDQxMjcsImV4cCI6MTY1NzM5MDUyN30.Q-m4CfcueWHzvnQVs1yFFBRnc6O7t7VR71T800ip7_0",
      refreshToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiQXR0YXIiLCJpYXQiOjE2NTczMDQxMjcsImV4cCI6MTY1NzM5MDUyN30.Q-m4CfcueWHzvnQVs1yFFBRnc6O7t7VR71T800ip7_0",
      user: {
        ...Users.find((el) => el.username === "Popescu"),
        roles: [
          "curator:read",
          "curator:edit",
          "curator:drop",
          "students:read",
          "students:edit",
          "students:drop",
          "education:edit",
          "education:drop",
          "education:read",
        ],
      },
    };
  }

  forgotPassword(payload = {}) {
    return [];
  }

  resetPassword(token: string, payload = {}) {
    return [];
  }

  checkResetToken(token: string) {
    return [];
  }

  refreshToken(payload = {}) {
    return [];
  }

  getUser(payload = {}) {
    return {
      id: 7,
      username: "Popescu",
      email: "Popescu.Ion@gmail.com",
      name: "Popescu Ion",
      photoUrl: "",
      isActive: false,
      confirmCode: "",
      createdAt: "2022-02-20T17:16:09.429Z",
      updatedAt: "2022-06-01T07:30:13.938Z",
      isRoot: false,
      isOwner: false,
      isCurator: false,
      lastLogin: "1970-01-01T00:00:00.000Z",
      lang: "ru",
      sex: "unisex",
      phone: "",
      address: "",
      roles: [
        "curator:read",
        "curator:edit",
        "curator:drop",
        "students:read",
        "students:edit",
        "students:drop",
        "education:edit",
        "education:drop",
        "education:read",
      ],
    };
  }
}

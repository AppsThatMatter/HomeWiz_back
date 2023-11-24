import { Elysia } from "elysia";
import UserController from "./user.controller";
import {
  CreateUserValidate,
  DeleteUserValidate,
  GetUserListValidate,
  GetUserValidate,
  UpdateUserValidate,
  SetUserDValidate,
} from "./user.validate";

export const UserRouter = (app: Elysia) => {
  const userController = new UserController();

  app.group("/user", (app) =>
    app
      .get(
        "/",
        () => {
          return userController.getList();
        },
        GetUserListValidate
      )
      .post("/", (req) => userController.create(req), CreateUserValidate)
      .delete("/:id", (req) => userController.delete(req), DeleteUserValidate)
  );
};
// .put("/:id", (req) => userController.update(req), UpdateUserValidate)
// .get("/:id", (req) => userController.getById(req), GetUserValidate)
// .put("/:id", (req) => userController.addDetail(req), SetUserDValidate)

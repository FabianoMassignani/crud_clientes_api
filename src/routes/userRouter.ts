import { Router } from "express";
import asyncMethod from "../middlewares/asyncMethod";
import UserController from "../controllers/userController";
import authenticateToken from "../middlewares/authenticateToken";
import { checkRole } from "../middlewares/checkRole";
import { Roles } from "../interfaces/user/user.interface";

export default class UserRouter {
  private router: Router;
  private controller: UserController;

  constructor(router: Router, controller: UserController) {
    this.router = router;
    this.controller = controller;

    this.router.post("/register", asyncMethod(this.controller.register));
    this.router.get(
      "/getAll",
      [authenticateToken, checkRole([Roles.ADMIN])],
      asyncMethod(this.controller.getAll)
    );
    this.router.put("/", asyncMethod(this.controller.update));
    this.router.delete("/:id", asyncMethod(this.controller.delete));
  }

  get getRouter() {
    return this.router;
  }
}

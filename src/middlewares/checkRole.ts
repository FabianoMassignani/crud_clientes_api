import { Request, Response, NextFunction } from "express";
import { Roles } from "../interfaces/user/user.interface";
import { JwtPayload } from "jsonwebtoken";
import UserService from "../services/UserServices";
import UserRepository from "../repositorys/userRepository";
import { NotFound, BadRequest } from "../exceptions";

interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

export const checkRole = (roles: Array<Roles>) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const id = (req as AuthenticatedRequest).user.sub;

    if (!id) throw new NotFound("Usuário", 404);

    const userService = new UserService(new UserRepository());

    const user = await userService.getById(id);

    if (!user) throw new NotFound("Usuário", 404);

    if (roles.indexOf(user.role) > -1) {
      next();
      return;
    }

    throw new BadRequest(
      "Você não tem permissão para acessar este recurso",
      401
    );
  };
};

export default checkRole;

import { Request, Response, NextFunction } from "express";
import { Roles } from "../interfaces/user/user.interface";
import { JwtPayload } from "jsonwebtoken";
import UserService from "../services/UserServices";
import UserRepository from "../repositorys/userRepository";
import { NotFound, BadRequest } from "../exceptions";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const checkRole = (roles: Array<Roles>) => {
  return async (
    req: AuthenticatedRequest,
    _res: Response,
    next: NextFunction
  ) => {
    const { user } = req;

    if (!user) throw new NotFound("Usuário no cabeçalho da requisição", 404);

    const { sub } = user;

    if (!sub)
      throw new NotFound("Id do usuário no cabeçalho da requisição", 404);

    const userService = new UserService(new UserRepository());

    try {
      const userRole = await userService.getById(sub);

      if (roles.indexOf(userRole.role) > -1) {
        next();
        return;
      }

      throw new BadRequest(
        "Você não tem permissão para acessar este recurso",
        401
      );
    } catch (error) {
      throw new BadRequest("Erro ao verificar permissão", 400);
    }
  };
};

export default checkRole;

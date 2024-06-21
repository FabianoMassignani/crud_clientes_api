import { Request, Response } from "express";
import UserService from "../services/UserServices";

class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  register = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;

    const user = await this.userService.create(body);

    return res.status(201).json({ user: user, message: "Criado com sucesso" });
  };

  getById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const user = await this.userService.getById(id);

    return res.status(200).json({ user: user });
  };

  getAll = async (req: Request, res: Response): Promise<Response> => {
    const users = await this.userService.getAll();

    return res.status(200).json({ users: users });
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;

    const user = await this.userService.update(body);

    return res.status(201).json({ user: user, message: "Editado com sucesso" });
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    await this.userService.delete(id);

    return res.status(201).json();
  };
}

export default UserController;

import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

export class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    try {
      const { code } = req.body;
      const service = new AuthenticateUserService();
      const result = await service.execute(code)
      return res.json(result)
    } catch (error) {
      return res.json({
        error: error.message
      })
    }
  }
}
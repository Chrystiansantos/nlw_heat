import { Request, Response } from 'express'
import { GetLastTreeMessage } from '../services/GetLastTreeMessageService'

export class GetMessageTreeController {
  async get(req: Request, res: Response) {
    try {
      const service = new GetLastTreeMessage();
      const result = await service.execute();
      return res.json(result)
    } catch (error) {
      return res.json({ error: error.message })
    }
  }
}
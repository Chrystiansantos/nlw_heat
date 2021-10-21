import { Request, Response } from 'express'
import { CreateMessageService } from '../services/CreateMessageService'


export class CreateMessageController {
  async handle(req: Request, res: Response) {
    try {
      const { message } = req.body
      const { user_id } = req
      const service = new CreateMessageService()
      const createMessage = await service.execute(message, user_id)
      return res.json(createMessage)

    } catch (error) {
      console.log(error)
      return res.json({ error: error.message })
    }


  }
}
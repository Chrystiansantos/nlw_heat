import { io } from '../app';
import prismaClient from '../prisma'

export class CreateMessageService {
  async execute(text: string, user_id: string) {
    const message = await prismaClient.message.create({
      data: {
        text,
        user_id
      },
      // Este include fara com que apos a criacao ele retorne os dados de usuario
      include: {
        user: true
      }
    })
    const infoWs = {
      text: message.text,
      user_id: message.user_id,
      created_at: message.created_at,
      user: {
        name: message.user.name,
        avatar_url: message.user.avatar_url
      }
    }

    io.emit('new_message', infoWs)
    return message;
  }
}
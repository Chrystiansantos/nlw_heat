import "dotenv/config"
import express, { Request, Response } from 'express';
import cors from 'cors'
import { routes } from './routes/index'
import { Server } from 'socket.io'
import http from 'http'

const app = express();
app.use(cors())

const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
  cors: {
    origin: '*'
  }
})
io.on('connection', (socket) => {
  console.log('Usuario conectado no socket', socket.id)
})

app.use(express.json())
app.use(routes)

app.get('/github', (req: Request, res: Response) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

app.get('/signin/callback', (req: Request, res: Response) => {
  const { code } = req.query;
  return res.json(code)
})

export { serverHttp, io }
import { Router } from 'express'
import { AuthenticateUserController } from '../controllers/AuthenticateUserController';
import { CreateMessageController } from '../controllers/CreateMessageController';
import { GetMessageTreeController } from '../controllers/GetLasteTreeMessagesController';
import { ProfileUserController } from '../controllers/ProfileUserController';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';



const routes = Router();

const autenticateController = new AuthenticateUserController();
const createMessageController = new CreateMessageController();
const getLastTreeMessage = new GetMessageTreeController();
const profileUserController = new ProfileUserController();

routes.post('/authenticate', autenticateController.handle)

routes.post('/messages', ensureAuthenticated, createMessageController.handle)
routes.get('/messages/last3', getLastTreeMessage.get)

routes.get('/profile', ensureAuthenticated, profileUserController.index)

export { routes }
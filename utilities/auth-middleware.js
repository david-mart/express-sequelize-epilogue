import { checkUserToken } from '../controllers/auth.controller';
import { User } from '../utilities/database';

const authMiddleware = async (request, response, context) => {
  try {
    const { _payload } = await checkUserToken(request.headers.authorization);
    const { email } = _payload;
    const user = await User.find({ where: { email } });
    if (user && user.permissions > 0) {
      request.body.createdBy = user.id;
      return context.continue();
    } else {
      response.status(403).send('Unauthorized');
      return context.stop();
    }
  } catch (error) {
    response.status(401).send('Unauthorized');
    return context.stop();
  }
};

export default authMiddleware;

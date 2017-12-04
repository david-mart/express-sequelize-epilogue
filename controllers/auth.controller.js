import GoogleAuth from 'google-auth-library';
import { googleAuthClientId } from '../config';
import { User } from '../utilities/database';

export const checkUserToken = token => {
  return new Promise((resolve, reject) => {
    const auth = new GoogleAuth();
    const client = new auth.OAuth2(googleAuthClientId, '', '');
    client.verifyIdToken(token, googleAuthClientId, (error, login) => {
      if (error) {
        reject(error);
      }
      resolve(login);
    });
  });
};

const authenticateUser = async ({ body }, response) => {
  const { id_token } = body;
  try {
    const { _payload } = await checkUserToken(id_token);
    const { name, email, picture } = _payload;

    const user = await User.find({ where: { email } });

    if (!user) {
      await User.create({ name, email, picture });
    }

    if (user.permissions > 0) {
      return response.status(200).json(user);
    }
    return response.status(403).send('Forbidden');
  } catch (error) {
    return response.status(401).send('Unauthorized');
  }
};

const authController = {
  post: authenticateUser
};

export default authController;

import { NextApiHandler } from 'next';
import createError from '../../../src/api/utils/createError';
import { nanoid } from 'nanoid';
import handleErrors from '../../../src/api/middlewares/handleErrors';
import withDb from '../../../src/api/middlewares/withDb';
import bcrypt from 'bcryptjs';

async function comp(password: string, hashed: string) {
  return bcrypt.compare(password, hashed);
}
const authHandler: NextApiHandler = async (req, res) => {
  const models = req.models;
  if (!models) {
    throw createError(500, 'Could not find db connection');
  }
  switch (req.method) {
    case 'GET':
      // let user = await models.User.find({});
      // res.json(user);
      throw createError(405, 'Method Not Allowed');
    case 'POST':
      const { username, password } = req.body;
      const user = await models.User.findOne({ username: username });
      if (!user || !(await user.verify(password, user.password))) {
        throw createError(401, 'Authentication Failed');
      }
      return res.json(user);
    default:
      throw createError(405, 'Method Not Allowed');
  }
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default handleErrors(withDb(authHandler));

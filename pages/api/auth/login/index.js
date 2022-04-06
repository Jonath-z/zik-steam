import { db } from '../../database/mongodb';

export default async function handler(req, res) {
  console.log(req.body);
  const isUserExits = async (email) => {
    const user = await db
      .collection('users')
      .find({ email })
      .toArray();
    if (user.length === 0) {
      console.log('not found');
      return {
        isExist: false,
      };
    } else {
      return {
        isExist: true,
        user: user,
      };
    }
  };

  if (req.method === 'POST') {
    const body = req.body;

    if (!(await isUserExits(body.email)).isExist) {
      res.json({
        status: 404,
        message: 'user not found',
      });
    } else {
      const user = (await isUserExits(body.email)).user;
      res.json({
        status: 302,
        message: 'user found',
        user: user[0],
      });
    }
  }
}

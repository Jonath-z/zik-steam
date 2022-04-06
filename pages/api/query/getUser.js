import { db } from '../database/mongodb';

export default async function handler(req, res) {
  const isUserExits = async (id) => {
    console.log('id = ', id);
    const user = await db
      .collection('users')
      .find({ id: id })
      .toArray();
    console.log('user', user);
    if (user.length === 0) return false;
    return true;
  };

  if (req.method === 'POST') {
    console.log('is exists:', await isUserExits(req.body.id));
    if (await isUserExits(req.body.id)) {
      res.json({
        status: 302,
        message: 'user found',
      });
    } else {
      res.json({
        status: 404,
        message: 'user not found',
      });
    }
  }
}

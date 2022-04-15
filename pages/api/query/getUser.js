import { db } from '../database/mongodb';

export default async function handler(req, res) {
  const isUserExits = async (id) => {
    console.log('id = ', id);
    const user = await db
      .collection('users')
      .find({ id: id })
      .toArray();
    console.log('user', user);
    if (user.length === 0)
      return {
        isExist: false,
        user: [],
      };
    return {
      isExist: true,
      user: user,
    };
  };

  if (req.method === 'POST') {
    const isExist = await isUserExits(req.body.id);
    if (isExist.isExist) {
      res.status(200).json({
        message: 'user found',
        user: isExist.user,
      });
    } else {
      res.status(404).json({
        message: 'user not found',
        user: isExist.user,
      });
    }
  }
}

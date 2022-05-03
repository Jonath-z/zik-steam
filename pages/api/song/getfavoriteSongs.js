import { db, initializeDB } from '../database/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST' && req.body.userId) {
    await initializeDB();
    const user = await db
      .collection('users')
      .find({ id: req.body.userId })
      .toArray();
    console.log('user id in get all ', user);

    const userFavoriteSongs = user[0].favorites;

    res.status(200).json({
      favoriteSongs: userFavoriteSongs,
    });
  }
}

import { db, initializeDB } from '../database/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await initializeDB();
    const user = await db
      .collection('users')
      .find({ id: req.body.userId })
      .toArray();

    const favoriteArtists = user[0].favoriteArtists;

    if (favoriteArtists) {
      res.status(200).json({
        favoriteArtists: favoriteArtists,
      });
    } else {
      res.status(200).json({
        favoriteArtists: [],
      });
    }
  }
}

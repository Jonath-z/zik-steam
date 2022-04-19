import { db } from '../database/mongodb';

export default async function handler(req, res) {
  console.log('req body', req.body);
  if (req.method === 'POST') {
    const user = await db
      .collection('users')
      .find({ id: req.body.userId })
      .toArray();

    const favoriteArtists = user[0].favoriteArtists;

    console.log('favorites', favoriteArtists);

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

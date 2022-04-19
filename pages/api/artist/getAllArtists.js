import { db } from '../database/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const allArtists = await db
      .collection('artists')
      .find({})
      .toArray();

    const user = await db
      .collection('users')
      .find({ id: req.body.userId })
      .toArray();

    const favoriteArtists = user[0].favoriteArtists;

    let discoveredArtist = [];

    if (favoriteArtists && favoriteArtists.length !== 0) {
      for (let i = 0; i < allArtists.length; i++) {
        for (let j = 0; j < favoriteArtists.length; j++) {
          if (allArtists[i].id !== favoriteArtists[j].id) {
            discoveredArtist.push(allArtists[i]);
          }
        }
      }

      res.status(200).json({
        allArtists: discoveredArtist,
      });
    } else {
      res.status(200).json({
        allArtists: allArtists,
      });
    }
  }
}

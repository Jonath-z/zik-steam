import { db } from '../database/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const allSongs = await db
        .collection('songs')
        .find({})
        .toArray();
      res.json({
        status: 200,
        data: allSongs,
      });
    } catch (e) {
      console.log(e);
    }
  }
}

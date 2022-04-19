import { db } from '../database/mongodb';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const artist = req.body.artist;
    console.log(req.body);

    await db.collection('users').updateOne(
      { id: req.body.userId },
      {
        $push: { favoriteArtists: artist },
      },
    );
    res.status(200).json({ message: 'successfully updated' });
  }
}

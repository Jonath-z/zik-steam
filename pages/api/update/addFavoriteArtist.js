import { db, initializeDB } from '../database/mongodb';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    await initializeDB();
    const artist = req.body.artist;
    console.log(req.body);

    const artistResponse = await db
      .collection('artists')
      .find({ id: artist.id })
      .toArray();

    const newArtistsLikes = artistResponse[0].likes + 1;
    console.log('old likes', artistResponse[0].likes);
    console.log('new likes', newArtistsLikes);

    await db.collection('users').updateOne(
      { id: req.body.userId },
      {
        $push: { favoriteArtists: artist },
      },
    );
    await db.collection('artists').updateOne(
      { id: artist.id },
      {
        $set: { likes: newArtistsLikes },
      },
    );
    res.status(200).json({ message: 'successfully updated' });
  }
}

import { db } from '../database/mongodb';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const artist = req.body.artist;

    const artistResponse = await db
      .collection('artists')
      .find({ id: artist.id })
      .toArray();

    const newArtistsLikes = artistResponse[0].likes - 1;
    console.log('old likes', artistResponse[0].likes);
    console.log('new likes', newArtistsLikes);

    await db.collection('users').updateOne(
      { id: req.body.userId },
      {
        $pull: { favoriteArtists: { id: artist.id } },
      },
    );
    await db.collection('artists').updateOne(
      { id: artist.id },
      {
        $set: { likes: newArtistsLikes },
      },
    );
    res.status(200).json({ message: 'successfully deleted' });
  }
}

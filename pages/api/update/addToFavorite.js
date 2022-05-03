import { db, initializeDB } from '../database/mongodb';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    await initializeDB();
    const song = req.body.song;
    console.log(req.body);

    const userFavorites = await db
      .collection('users')
      .find({ id: req.body.id })
      .toArray();

    console.log('favorite', userFavorites);

    const isSongExist = (songId) => {
      if (userFavorites[0].favorites) {
        const song = userFavorites[0].favorites.filter(
          (songFavorite) => {
            return songFavorite.id === songId;
          },
        );
        console.log('song matched', song);
        if (song.length === 0) return false;
        return true;
      }
      return false;
    };

    if (!isSongExist(req.body.song.id)) {
      await db.collection('users').updateOne(
        { id: req.body.id },
        {
          $push: { favorites: song },
        },
      );
      res.status(200).json({ message: 'successfully updated' });
    } else {
      res.json({
        error: 'song is already favorite',
      });
    }
  }
}

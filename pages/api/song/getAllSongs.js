import { db, initializeDB } from '../database/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST' && req.body.userId) {
    await initializeDB();
    console.log('get All song req', req.body);
    try {
      const allSongs = await db
        .collection('songs')
        .find({})
        .toArray();

      console.log('get all song <all songs>', allSongs);

      const user = await db
        .collection('users')
        .find({ id: req.body.userId })
        .toArray();
      console.log('user id in get all ', user);

      const userFavoriteSongs = user[0].favorites;

      console.log('get all favorites', userFavoriteSongs);

      if (userFavoriteSongs.length !== 0) {
        let songCollections = [];
        for (let j = 0; j < userFavoriteSongs.length; j++) {
          for (let i = 0; i < allSongs.length; i++) {
            if (allSongs[i].songId === userFavoriteSongs[j].id) {
              allSongs[i].isLiked = true;
              console.log('song matched', allSongs[i]);
              if (songCollections.indexOf(allSongs[i]) === -1)
                songCollections.push(allSongs[i]);
            } else {
              console.log('unmatched songs', allSongs[i]);
              if (songCollections.indexOf(allSongs[i]) == -1)
                songCollections.push(allSongs[i]);
            }
          }
        }
        console.log('song with favorites', songCollections);
        res.status(200).json({
          allSongs: songCollections,
        });
        songCollections = [];
      } else if (userFavoriteSongs.length === 0) {
        console.log('allSongs are'.allSongs);
        res.status(200).json({
          allSongs,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
}

import { db } from '../database/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('upload Artist', req.body);
    const artist_name = req.body.artistIds.artistName;
    const artist_profile = req.body.artistIds.artistProfileUrl;

    const isArtistExist = async () => {
      const artist = await db
        .collection('artists')
        .find({ artist_name: artist_name })
        .toArray();

      if (artist.length === 0) return false;
      return true;
    };

    if (!(await isArtistExist())) {
      await db.collection('artists').insertOne({
        artist_name: artist_name,
        artist_profile: artist_profile,
      });

      res.status(200).json('succefully added');
    } else {
      res.status(500).json('server error');
    }
  }
}

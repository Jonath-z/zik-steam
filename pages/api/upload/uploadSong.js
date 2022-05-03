// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db, initializeDB } from '../database/mongodb';

export default async function handler(req, res) {
  console.log(typeof req.body, req.body);
  if (req.method === 'POST') {
    await initializeDB();
    const body = req.body.song;
    console.log('artist name:', req.body);
    const song = {
      songId: body.songId,
      likes: body.likes,
      streamNumber: body.streamNumber,
      streamHours: body.streamHours,
      isBestStreamed: body.isBestStreamed,
      artistName: body.artistName,
      isLiked: false,
    };

    const artist = await db
      .collection('artists')
      .find({ artist_name: req.body.song.artistName })
      .toArray();

    if (artist.length !== 0) {
      await db.collection('songs').insertOne(song);
      await db.collection('artists').updateOne(
        { artist_name: req.body.artistName },
        {
          $push: { songs: song },
        },
      );
      res.status(200).json('succefully uploaded');
    } else {
      res.status(404).json('artist not found');
    }
  }
}

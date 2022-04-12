import { db } from '../database/mongodb';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const body = req.body;

    const songs = await db
      .collection('songs')
      .find({ songId: body.songId })
      .toArray();

    if (songs) {
      const updateStreamHours = songs.map((song) => {
        return {
          ...song,
          streamHours: (song.streamHours += body.streamedTime),
        };
      });

      await db.collection('songs').updateOne(
        { songId: body.songId },
        {
          $set: updateStreamHours[0],
        },
      );

      res.json({
        status: 200,
        message: 'stream time updated',
      });
    }
  }
}

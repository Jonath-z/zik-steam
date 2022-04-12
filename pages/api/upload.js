// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from './database/mongodb';

export default async function handler(req, res) {
  console.log(typeof req.body, req.body);
  switch (req.method) {
    case 'POST':
      const body = req.body.song;
      const song = {
        songId: body.songId,
        likes: body.likes,
        streamNumber: body.streamNumber,
        streamHours: body.streamHours,
        isBestStreamed: body.isBestStreamed,
      };

      await db.collection('users').updateOne(
        { id: body.id },
        {
          $push: { songs: song },
        },
      );

      await db.collection('songs').insertOne(song);
      res.status(200).json({ successFullyUploaded: true });

      break;
    case 'GET':
      res.status(200).json({ name: 'John Doe' });
      break;
  }
}

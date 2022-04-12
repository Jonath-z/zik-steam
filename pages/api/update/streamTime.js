import { db } from '../database/mongodb';

export default async function handler(req, res) {
  console.log('update time body', req.body);

  if (req.method === 'PUT') {
    const body = req.body;

    await db.collection('users').updateOne(
      { id: body.userId, 'songs.id': body.songId },
      {
        $set: {
          'songs.$.streamHours': { $sum: body.streamedTime },
        },
      },
    );

    res.json({
      status: 200,
      message: 'stream time updated',
    });
  }
}

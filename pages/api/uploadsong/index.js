import clientPromise from '../lib/mongodb';

const uploadSongInMongo = async (req, res) => {
  const client = await clientPromise;
  const db = client.db('zik-stream');

  switch (req.method) {
    case 'POST':
      let body = JSON.parse(req.body);

      const song = {
        streamId: body.songId,
        likes: body.likes,
        streamNumber: body.streamNumber,
        streamHours: body.streamHours,
        isBestStreamed: false,
      };

      const data = await db.collection('users').find({}).toArray();
      data.forEach((user) => {
        if (user.user === body.user) {
          (async () => {
            await db.collection('users').updateOne({
              $push: {
                songs: song,
              },
            });
            res.JSON({ successFullyUploaded: true });
          })();
        }
      });
      break;
  }
};

export default uploadSongInMongo;

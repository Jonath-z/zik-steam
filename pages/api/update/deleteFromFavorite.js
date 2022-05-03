import { db, initializeDB } from '../database/mongodb';

export default async function handler(req, res) {
  console.log(req);
  if (req.method === 'POST') {
    await initializeDB();
    console.log('song', req.body.song);

    await db.collection('users').updateOne(
      { id: req.body.id },
      {
        $pull: { favorites: { id: req.body.song.id } },
      },
    );
    res.status(200).json({ message: 'successfully deleted' });
  }
}

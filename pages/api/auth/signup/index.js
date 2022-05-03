import { db } from '../../database/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body);
    const body = req.body;
    const user = await db
      .collection('users')
      .find({ email: body.email })
      .toArray();
    console.log('users', user.length);

    if (user.length === 0) {
      const user = {
        email: body.email,
        password: body.password,
        id: req.body.id,
        favorites: [],
        favoriteArtists: [],
      };
      await db.collection('users').insertOne(user);
      res.json({
        status: 201,
        message: 'user created',
      });
    } else {
      res.json({
        status: 409,
        message: 'user email exists',
      });
    }
  }
}

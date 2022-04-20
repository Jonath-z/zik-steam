import { db } from '../database/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const timeCoverter = (time) => {
      const timeInMin = time / 60;
      if (timeInMin < 60) {
        return {
          time: timeInMin.toFixed(1),
          timeUnit: 'minutes',
        };
      } else {
        const timeInHours = time / 3600;
        return {
          time: timeInHours.toFixed(1),
          timeUnit: 'hours',
        };
      }
    };

    const songs = await db
      .collection('songs')
      .find({ artistName: req.body.artistName })
      .toArray();

    let streamsSum = 0;
    if (songs.length > 1) {
      for (let i = 0; i < songs.length; i++) {
        streamsSum = streamsSum + songs[i].streamHours;
      }
      res.status(200).json({
        streams: {
          time: timeCoverter(streamsSum).time,
          units: timeCoverter(streamsSum).timeUnit,
        },
      });
    } else if (songs.length === 1) {
      res.status(200).json({
        streams: {
          time: timeCoverter(streamsSum).time,
          units: timeCoverter(streamsSum).timeUnit,
        },
      });
    } else {
      res.status(200).json({
        streams: {
          time: 0,
          units: 'minutes',
        },
      });
    }
  }
}

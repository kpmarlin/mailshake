const { request } = require('express');
const QueryTypes = require('sequelize');
const mailshake = require('mailshake-node')('88630d73-e2c4-485f-8d1a-4c778bfc0411');

module.exports = (db) => {
  return {
    contactProducers: async (req, res, next) => {
      if(!req.body.year || isNaN(req.body.year) || req.body.year > 2020 || req.body.year < 2011)
        return res.status(400).json({message: 'Invalid year.'});

      try {
        const albums = await db.query('SELECT * FROM album_of_the_year WHERE year_released = $year', {
          bind: {
            year: req.body.year
          },
          type: QueryTypes.SELECT
        });

        await mailshake.recipients.add({
          campaignID: 79347,
          addAsNewList: true,
          addresses: albums[0].map(album => {
            return {
              emailAddress: Math.random().toString(25).substr(2) + '@mailinator.com',
              fullName: album.album_artist,
              fields: {
                album_artist: album.album_artist,
                album_title: album.album_title
              }
            }
          })
        });

        return res.json({count: albums[0].length});
      } catch(e) {
        return res.status(500).json({message: 'An error has occurred. ' + e.message});
      }
    }
  };
}
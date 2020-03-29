const aws = require('aws-sdk');

module.exports = new aws.S3({
    google: {
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENTSECRET
    },
    facebook: {
      clientID: process.env.FACEBOOK_CLIENTID,
      clientSecret: process.env.FACEBOOK_CLIENTSECRET
    },
    mongodb: {
      dbURI: process.env.MONGODB_URI,
      mongolabBlueURI: process.env.MONGOLAB_BLUE_URI
    },
    session: {
      cookieKey: process.env.SESSION_COOKIEKEY
    }
  });
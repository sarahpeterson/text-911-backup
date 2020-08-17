// text-created.js
require('dotenv').config();

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER
} = process.env;

exports.handler = function(event, context, callback) {
  const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  const msg = JSON.parse(event.body);
  console.log(msg)
  // client.messages
  //   .create({
  //     from: TWILIO_PHONE_NUMBER,
  //     to: +4156345171,
  //     body: msg.body
  //   }).then((res) => {
  //     console.log(res);
  //     return callback(null, {
  //       statusCode: 200,
  //       body: JSON.stringify({
  //         message: 'Text message successfully sent!',
  //         data: res,
  //       })
  //     })
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     return callback(null, {
  //       statusCode: error.status,
  //       body: JSON.stringify({
  //         message: error.message,
  //         error: error,
  //       })
  //     })
  //   });

  client.calls
    .create({
       twiml: `<Response><Say>${msg.body}</Say></Response>`,
       to: '+15103294382',
       from: TWILIO_PHONE_NUMBER,
     }).then((res) => {
       console.log(res);
       return callback(null, {
         statusCode: 200,
         body: JSON.stringify({
           message: 'Voice call successfully sent!',
           data: res,
         })
       })
    }).catch((err) => {
      console.log(err);
      return callback(null, {
        statusCode: error.status,
        body: JSON.stringify({
          message: error.message,
          error: error,
        })
    });
  })
};

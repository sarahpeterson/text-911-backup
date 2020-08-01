// // text-created.js
// // load the env file and make values accessible via process.env
// require('dotenv').config();
//
// const {
//   TWILIO_ACCOUNT_SID,
//   TWILIO_AUTH_TOKEN,
//   TWILIO_PHONE_NUMBER
// } = process.env;
//
// // exports.handler = function(event, context, callback) {
// //   console.log('Submission created!')
// //   // the logic for sending the message will go here
// //   const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
//
// exports.handler = function(event, context, callback) {
//   console.log('Submission created!')
//   // the logic for sending the message will go here
//   const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
//
//   // Promise.all(
//     // split the string of several messages into single numbers
//     // send message to each of them
//     client.messages
//         .create({
//           from: TWILIO_PHONE_NUMBER,
//           to: +4156345171,
//           body: 'test'
//         }).then((res) => {
//           console.log(res);
//         })
//         .catch(err => {
//           console.log(err);
//         });
//
//   // )
//
// };
// // };
// // require('dotenv').config();
// //
// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const pino = require('express-pino-logger')();
// //
// // const client = require('twilio')(
// //   process.env.TWILIO_ACCOUT_SID,
// //   process.env.TWILIO_AUTH_TOKEN
// // );
// // const app = express();
// // app.use(bodyParser.urlencoded({ extended: false }));
// // app.use(bodyParser.json());
// // app.use(pino);
// //
// // app.post('/api/messages', (req, res) => {
// //   req.header('Access-Control-Allow-Origin', '*');
// //   res.header('Content-Type', 'application/json');
// //   res.header('Access-Control-Allow-Methods', 'POST');
// //   res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
// //   client.messages
// //       .create({
// //         from: process.env.TWILIO_PHONE_NUMBER,
// //         to: +4156345171,
// //         body: req.body.body
// //       })
// //       .then(() => {
// //         console.log(res);
// //         res.send(JSON.stringify({ success: true }));
// //       })
// //       .catch(err => {
// //         console.log(err);
// //         res.send(JSON.stringify({ success: false }));
// //       });
// // });
// // app.listen(3000, () =>
// //   console.log('Express server is running on localhost:3000')
// // );
const TwilioSdk = require('twilio')
// Your Account SID from www.twilio.com/console
const accountSid = process.env.TWILIO_ACCOUNT_SID
// Your Auth Token from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN
// instantiate twilio SDK
const twilio = new TwilioSdk(accountSid, authToken)

// use twilio SDK to send text message https://www.twilio.com/docs/libraries/node
exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body)

  const sms = {
    to: body.to,
    body: body.message || '',
    from: process.env.TWILIO_PHONE_NUMBER,
  }

  // add image to sms if body.image supplied
  if (body.image) {
    sms.mediaUrl = body.image
  }

  twilio.messages.create(sms).then((message) => {
    console.log(`text message sent!`, message.body)
    console.log(`date_created: ${message.date_created}`)
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Text message successfully sent!',
        data: message,
      })
    })
  }).catch((error) => {
    console.log('text message failed', error)
    return callback(null, {
      statusCode: error.status,
      body: JSON.stringify({
        message: error.message,
        error: error,
      })
    })
  })
}

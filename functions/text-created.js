// text-created.js
// load the env file and make values accessible via process.env
require('dotenv').config();

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER
} = process.env;

// exports.handler = function(event, context, callback) {
//   console.log('Submission created!')
//   // the logic for sending the message will go here
//   const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

exports.handler = function(event, context, callback) {
  console.log('Submission created!')
  // the logic for sending the message will go here
  const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

  // Promise.all(
    // split the string of several messages into single numbers
    // send message to each of them
    client.messages
        .create({
          from: TWILIO_PHONE_NUMBER,
          to: +4156345171,
          body: 'test'
        }).then((res) => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });

  // )
    
};
// };

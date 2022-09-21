require('dotenv').config();
const schedule = require('node-schedule')
const axios = require("axios");
//the begining of the twillo api call
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// rapid api i sused to get the message  eing sent to the user
function sendmessage(){

const options = {
  method: 'GET',
  url: 'https://ajith-messages.p.rapidapi.com/getMsgs',
  params: {category: 'love'},
  headers: {
    'X-RapidAPI-Key': '82d561d07bmsha447f10c33da1f6p1f1af8jsnbb7e8029615a',
    'X-RapidAPI-Host': 'ajith-messages.p.rapidapi.com'
  }
};

     axios.request(options).then(function (response) {
      let message = response.data.Message
      client.messages
  .create({
    //message sent is the response of the api being sent to the user to the number 
     body: message,
     from: process.env.FROM,
     to: process.env.TO
   })
  .then(message => console.log(message.sid))
  .catch(err=> console.log(err));
      
  }).catch(function (error) {
    console.log(error);
  });

}
// this is to schedule the message to be sent at // 8am 

  

const job = schedule.scheduleJob('18 * * * *', function(){
  sendmessage();
  console.log('The answer to life, the universe, and everything!');
});
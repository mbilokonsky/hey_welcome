var Twit = require("twit");

var T = new Twit({
  consumer_key: process.env.WELCOME_CK,
  consumer_secret: process.env.WELCOME_CS,
  access_token: process.env.WELCOME_AT,
  access_token_secret: process.env.WELCOME_ATS,
  timeout_ms: 60*1000,  // optional HTTP request timeout to apply to all requests.
});

var stream = T.stream("statuses/filter", {track:"hello world"});
console.log("Now listening for world greetings!");

stream.on("tweet", (tweet) => {
  if (tweet.text.length < 15) { // leave room for comma and ! if present
    var username = "@" + tweet.user.screen_name;

    T.post('statuses/update', {in_reply_to_status_id: tweet.id_str, status: getMessage(username)}, function(err, data, response) {
      if (err) { console.error(err); }
      else { console.log("[" + username + "] - replied successfully.")};
    });
  } else {

  }
});


const greetings = [
  "Welcome, we're glad you're here! :)",
  "Congrats on taking your first steps into the world! :)",
  "HELLO!!! <3 <3 <3",
  "WELCOME!!! :) :) :)",
  "We're so glad to see you! Welcome! :)",
  "HI! Thank you for being here! :)",
  "'Hello!' -- the world",
  "Hello to you as well! Please make yourself at home! :)"
];

function getMessage(username) {
  return username + " " + greetings[Math.floor(Math.random() * greetings.length)];
}
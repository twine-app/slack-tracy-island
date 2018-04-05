const express = require("express");
const token = process.env.SLACK_BOT_TOKEN
const Slack = require('slack')
const bot = new Slack({token})
const app = express();

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/api/connect", async (req, res) => {
    const response = await bot.users.list({presence: true})
    console.log('Response from Slack')
    console.log(response)
    res.json({
        connected: true,
        message:'hello from Tracy Island',
        users: response.members
    });
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

const express = require("express");
const token = process.env.SLACK_BOT_TOKEN
const Slack = require('slack')
const bot = new Slack({token})
const https = require('https')
const Stream = require('stream').Transform
const app = express()

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/api/connect", async (req, res) => {
    const response = await bot.users.list({presence: true})
    console.log('Response from Slack')
    console.log(response)
    let trimmedUsers = []

    response.members.forEach((user) => {
        let trimmedUser = {
            id: user.id,
            name: user.name,
            is_bot: user.is_bot,
            deleted: user.deleted,
            presence: user.presence,
            real_name: user.real_name,
            tz: user.tz,
            tz_offset: user.tz_offset,
            profile: {
                title: user.profile.title,
                image_192: user.profile.image_192
            }
        }
        trimmedUsers.push(trimmedUser)
    })
    res.json({
        connected: true,
        message:'hello from Slack Tracy Island',
        users: trimmedUsers
    });
});

// For experimental eye blinking feature, we need to have
// images loaded from our own domain to prevent sandbox issues
app.get("/api/image-passthru", async (req, res) => {
    https.request(req.query.url, function(response) {
        var data = new Stream();

        response.on('data', function(chunk) {
            data.push(chunk);
        });

        response.on('end', function() {
            res.end(data.read())
        });
    }).end();
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

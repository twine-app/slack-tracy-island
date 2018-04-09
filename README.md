# Slack Tracy Island

This is a tool powered by Slack to visualise who in your team is reporting for duty, also display their local time if they are not located GMT.  

The name is a tenuous nod to the ahead of its time innovation found within Tracy Island's headquarters portrait gallery.

### Hackathon

This was the result of a two day hackathon. I'd suggest looking through the code before working out if you're comfortable hosting it.
However you'll be able to get your team's Slack up and running and deployed to Heroku super easily.

### Credit

The boilerplate to this application was based off this <a href="https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/">blog post</a> from Anthony Accomazzo 

## Running locally

```
npm i

cd client
npm i

cd ..
SLACK_BOT_TOKEN=blahblahyourtoken npm start
```

## Slack Token

Create a new Slack app, give it permissions to read profiles and presence information. Keep the token for `SLACK_BOT_TOKEN` 

## Deploying

### Background

The app is ready to be deployed to Heroku.

In production, Heroku will use `Procfile` which boots just the server:

```
web: npm run server
```

Inside `server.js`, we tell Node/Express we'd like it to serve static assets in production:

```
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
```

You just need to have Webpack produce a static bundle of the React app (below).

### Steps

We assume basic knowledge of Heroku.

**0. Setup your Heroku account and Heroku CLI**

For installing the CLI tool, see [this article](https://devcenter.heroku.com/articles/heroku-command-line).

**1. Build the React app**

Running `npm run build` creates the static bundle which we can then use any HTTP server to serve:

```
cd client/
npm run build
```

**2. Commit the `client/build` folder to source control**

From the root of the project:

```
git add client/build
git commit -m 'Adding `build` to source control'
```

**3. Create the Heroku app**

```
heroku apps:create food-lookup-demo
```

**4. Push to Heroku**

```
git push heroku master
```

Heroku will give you a link at which to view your live app.

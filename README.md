# passport-tanda
> Tanda OAuth2.0 Strategy for [Passport](http://passportjs.org/).

For more information, see [passort-oauth2](https://github.com/jaredhanson/passport-oauth2).  Only
 minor edits have been made to get it working with Tanda.

## Install

```sh
$ yarn add passport-tanda
```
or
```sh
$ npm install passport-tanda
```

## Usage

#### Configure Strategy

The OAuth 2.0 authentication strategy authenticates users using a third-party
account and OAuth 2.0 tokens.  The provider's OAuth 2.0 endpoints, as well as
the client identifer and secret, are specified as options.  The strategy
requires a `verify` callback, which receives an access token and profile,
and calls `cb` providing a user.

```js
passport.use(new TandaStrategy({
    clientID: EXAMPLE_CLIENT_ID,
    clientSecret: EXAMPLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/example/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ exampleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'oauth2'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```js
app.get('/auth/example',
  passport.authenticate('oauth2'));

app.get('/auth/example/callback',
  passport.authenticate('oauth2', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```

### Profile

The profile provided to the callback in `passport.use()` is based on the standard 
[passport profile](http://passportjs.org/docs/profile).  The only field missing is `emails`, as 
these are not available from `/users/me` on Tanda.

Additionally, the following *bonus* fields are available.

```js
const profile = {
  // ...standard passport profile
  timeZone,
  utcOffset,
  organisation,
  organisation_id,
  organisations,
  permissions,
  validSubscription,
  userIds,
  updatedAt,
}
```

For more info on these, see [the documentation](https://my.tanda.co/api/v2/documentation#general-current-user-get).

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2011-2016 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>

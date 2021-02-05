# ugc.dev

## Development

### Setup / Install

  * Make sure you have Node.js 12 installed
  * In the `app` directory:
    * `npm install`

### Dev Server

In the `app` directory:

```
npm run serve
```

In a second terminal in the `functions` directory:

```
npm run serve
```

To see the Firestore emulator with some data, hit this endpoint in your browser:
http://localhost:5001/ugc-site-dev/us-central1/refreshProjects

## Deployment

### Hosting

In the `app` directory:

```
npm run build && npm run deploy
```

### Functions

In the `functions` directory:

```
npm run build && npm run deploy
```

Note that the Functions have the following required config keys:

  * `github.token` - [value in valentine](https://valentine.corp.google.com/#/show/1612543501395716)

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

To seed the Firestore emulator with some data, hit this endpoint in your browser:
http://localhost:5001/ugc-site-dev/us-central1/refreshProjects

## Deployment

To deploy:
  * Navigate to the Actions page on GitHub: https://github.com/FirebasePrivate/ugc.dev/actions
  * Select the **Deploy** action and click **Run workflow**

Note that the Functions have the following required configuration (already set up):

  * `github.token` - [value in valentine](https://valentine.corp.google.com/#/show/1612543501395716)

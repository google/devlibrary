# ugc.dev

## Development

### Setup / Install

  * Make sure you have Node.js 12 installed
  * In the `app`, `functions` and `shared` directory:
    * `npm install`

### Dev Server

In the `app` directory:

```
npm run serve
```
If you face an error like: `Syntax Error: Error: error while parsing tsconfig.json`, then you must have some unsubmitted
changes to the repo while figuring out other errors or installing anything in the node_modules, so discard those changes before running the run serve command

Make sure you have access to the firebase account of ugc.dev, if you haven't contact Sam.
Once you have the access, you need to make sure your local environment is using the firebase project

So try these commands:

```
npx firebase login # this will ask for login on the browser for access to firebase CLI
npx firebase use ugc-site-dev

```
Then, make sure you have java installed in your machine, because the firebase emulator will need java runtime.

Go to GitHub and get a personal access token:
https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token

And then set it in your environment as `GITHUB_TOKEN` wherever you're running the functions emulator

In a second terminal in the `functions` directory which will build and run the emulator 

```
npm run serve
```

You can see the local emulator now in http://localhost:4000/
And the local instance at http://localhost:8080/

Note: 

To seed the Firestore emulator with some data, hit this endpoint in your browser:
http://localhost:5001/ugc-site-dev/us-central1/refreshProjects

## Deployment

To deploy:
  * Navigate to the Actions page on GitHub: https://github.com/FirebasePrivate/ugc.dev/actions
  * Select the **Deploy** action and click **Run workflow**

Note that the Functions have the following required configuration (already set up):

  * `github.token` - [value in valentine](https://valentine.corp.google.com/#/show/1612543501395716)

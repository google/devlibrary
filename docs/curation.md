# Curation

## Overview

There are two major curation tasks:

*   Adding/updating/removing projects
*   Adding/updating/removing authors

Each task is done by changing a `.json` file in this repository.

## Setup

Although all curation can be done by hand, there are some scripts in this
repository to make your life easier. To run them you will need Node.js version
12.x. The easiest way to get Node is to use
[nvm](https://github.com/nvm-sh/nvm).

After installing node, run `npm install` in the `shared` directory of this
repository.

## Import from Advocu

In most cases `.json` files should not be added manually, instead they should be
generated based on curation data from the Advocu API. In order to use this API
you will need to have the `ADVOCU_TOKEN` environment variable set on your
machine to a valid Advocu API token. If you don't know how to do this or what
the value should be ask a team member.

Next look at the file `config/advocu.json`:

```json
{
  "lastPullTime": <number>
}
```

This file holds a timestamp for the last time that the Advocu API data was
pulled. It should be changed and checked in to the repository after each pull.
If you want to include older entries, simply change the timestamp manually.

Finally run the following script:

```bash
npm run advocu
```

You will see some output like this:

```
> shared@1.0.0 advocu /Users/samstern/Projects/ugc.dev/shared
> ts-node ./scripts/advocu.ts

Last pull: 1970-01-01T00:00:00.000Z
New items: 10

// ...

Adding ml repo https://github.com/soumik12345/point-cloud-segmentation
Writing new file: /Users/samstern/Projects/ugc.dev/config/authors/soumik12345.json
Writing new file: /Users/samstern/Projects/ugc.dev/config/ml/repos/soumik12345-point-cloud-segmentation.json

Adding ml repo https://github.com/samadon1/heartmri
Writing new file: /Users/samstern/Projects/ugc.dev/config/authors/samadon1.json
Writing new file: /Users/samstern/Projects/ugc.dev/config/ml/repos/samadon1-heartmri.json

Success! Please 'git commit' any changes and push the new config files.
```

After this you will have new files in the `config` directory including a
modified `config/advocu.json`. Commit the files and create a pull reuqest.

## Projects

### Location

In order to locate the `.json` file for a project, you must know three things:

*   **product** - a simple identifier like `firebase`, `angular`, `flutter`
*   **type** - either `blog` or `repo`.
*   **id** - a unique identifier for the project, this can be anything and is
    normally automatically generated.

So for example:

```bash
# Product - firebase
# Type - repo
# Id - jsayol-FireSQL
config/firebase/repos/jsayol-FireSQL.json
```

### Adding/Updating

To add a new project, run the `addproject` script from within the `shared`
directory of this repo:

```bash
# The <product> argument is angular, firebase, ml, etc
# The <url> argument should be a URL pointing to a GitHub repository or a medium post
npm run addproject <product> <url>
```

This will create a basic `.json` file in the correct location, you should then
examine the file and fill in any missing fields.

### Deleting

To delete a project simply delete the `.json` file and it will be removed from
the site within 24 hours.

## Authors

### Location

An author is identified by their unique ID, which should almost always be their
GitHub or Medium username. Each author has a `.json` file:

```bash
# Author file for "bob123"
config/authors/bob123.json
```

The author file has both optional and required fields:

```js
{
  // REQUIRED
  "name": "...",
  "bio": "...",
  "photoURL": "...",

  // OPTIONAL
  "githubURL": "https://github.com/...",
  "mediumURL": "https://medium.com/..."
}
```

Each project may have zero or more authors, specified by the `authorIds` array
in the project `.json` file:

```js
{
  // ...
  "authorIds": ["bob123", "alice234"]
  // ...
}
```

### Adding/Updating

To add a new author, run the `addauthor` script from within the `shared`
directory of this repo:

```bash
# The <source> argument is either "github" or "medium"
# The <username> argument is their username on that platform, without the @ symbol
npm run addauthor <source> <username>
```

This will create a basic `.json` file in the correct location, you should then
examine the file and fill in any missing fields.

### Deleting

To delete an author simply delete the `.json` file and it will be removed from
the site within 24 hours.

# Curation

## Overview

There are two major curation tasks:

  * Adding/updating/removing projects
  * Adding/updating/removing authors

Each task is done by changing a `.json` file in this repository.

## Setup

Although all curation can be done by hand, there are some scripts in this repository to make your life easier. To run them you will need Node.js version 12.x. The easiest way to get Node is to use [nvm](https://github.com/nvm-sh/nvm).

After installing node, run `npm install` in the `shared` directory of this repository.

## Projects

### Location

In order to locate the `.json` file for a project, you must know three things:

  * **product** - a simple identifier like `firebase`, `angular`, `flutter`
  * **type** - either `blog` or `repo`.
  * **id** - a unique identifier for the project, this can be anything and is normally automatically generated.

So for example:

```bash
# Product - firebase
# Type - repo
# Id - jsayol-FireSQL
config/firebase/repos/jsayol-FireSQL.json
```

### Adding/Updating

To add a new project, run the `addproject` script from within the `shared` directory of this repo:

```bash
# The <product> argument is angular, firebase, ml, etc
# The <url> argument should be a URL pointing to a GitHub repository or a medium post
npm run addproject <product> <url>
```

This will create a basic `.json` file in the correct location, you should then examine the file and fill in any missing fields.

### Deleting

To delete a project simply delete the `.json` file and it will be removed from the site within 24 hours.

## Authors

### Location

An author is identified by their unique ID, which should almost always be their GitHub or Medium username. Each author has a `.json` file:

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

Each project may have zero or more authors, specified by the `authorIds` array in the project `.json` file:

```js
{
  // ...
  "authorIds": ["bob123", "alice234"]
  // ...
}
```

### Adding/Updating

To add a new author, run the `addauthor` script from within the `shared` directory of this repo:

```bash
# The <source> argument is either "github" or "medium"
# The <username> argument is their username on that platform, without the @ symbol
npm run addauthor <source> <username>
```

This will create a basic `.json` file in the correct location, you should then examine the file and fill in any missing fields.

### Deleting

To delete an author simply delete the `.json` file and it will be removed from the site within 24 hours.

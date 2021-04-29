# Config

This directory contains the configuration for each project listed on `devlibrary.withgoogle.com`.

## Adding a project

### Copy Template

There is a `template-{type}.json` file for each project type. To begin copy that file into the
appropriate product folder. For example to add a new GitHub repo to the Firebase section,
copy `template-repo.json` into `config/firebase/repos`.

Each project file should be given a unique name which will serve as the unique ID of the project
in the site database and in URLs:

  * For GitHub repos a good default ID is `$OWNER-$REPO`
  * For Blog posts a good default ID is the final portion of the Medium URL.

You can also use the `addproject` script in the `shared` directory to automatically copy the template and choose an ID:

```shell
$ cd shared

# Syntax: npm run addproject <product> <url>
$ npm run addproject firebase https://github.com/1amageek/Ballcap-iOS

> shared@1.0.0 addproject /workspace/devlibrary/shared
> node scripts/addproject.js "firebase" "https://github.com/1amageek/Ballcap-iOS"

Product: firebase
Project: https://github.com/1amageek/Ballcap-iOS
Writing new file: /workspace/devlibrary/config/firebase/repos/1amageek-Ballcap-iOS.json
```

### Fill in details

After copying the template make sure to fill in all required fields by hand.

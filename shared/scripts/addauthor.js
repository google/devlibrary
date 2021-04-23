const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

function getConfigDir() {
  const dir = path.dirname(__filename);
  return path.resolve(dir, "../../config");
}

async function addAuthor(username) {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const { name, bio } = await res.json();

  const author = {
    name: name || username,
    bio: bio || "",
    photoURL: `https://avatars.githubusercontent.com/${username}`,
    githubURL: `https://github.com/${username}`
  }

  const authorFilePath = path.join(getConfigDir(), 'authors', `${username}.json`);
  
  console.log(`Writing new file: ${authorFilePath}`);
  fs.writeFileSync(authorFilePath, JSON.stringify(author, undefined, 2));
}

function main() {
  if (process.argv.length < 3) {
    console.error("Missing required arguments:\nnpm run addauthor <github username>");
    return;
  }
  
  const username = process.argv[2];

  console.log(`GitHub username: ${username}`);
  addAuthor(username);
}

main();

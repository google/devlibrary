import { PubSub } from "@google-cloud/pubsub";
import { getRepoContent } from "./addproject";

const pubsub = new PubSub({
  projectId: "ugc-site-prod",
});

export async function main(args: string[]) {
  if (args.length < 5) {
    console.error(
      "Missing required arguments:\n" +
        "npm run refreshproject <product> <type> <id>\n\n" +
        "Example: npm run refreshproject firebase repo foo-bar-baz"
    );
    return;
  }

  const product = args[2];
  const type = args[3];
  const id = args[4];

  if (type !== "blog" && type !== "repo") {
    console.log(`Error: type must be 'blog' or 'repo' (type='${type}')`);
    return;
  }

  // Get content from GitHub
  const contentPath = `/config/${product}/${type}s/${id}.json`;
  const content = await getRepoContent("google", "devlibrary", contentPath);

  if (!content) {
    console.log(`Error: no such file ${contentPath}`);
    return;
  }

  const decoded = Buffer.from(content.content, content.encoding as any);
  const metadataStr = decoded.toString("utf-8");
  const metadata = JSON.parse(metadataStr) as unknown;

  // Send Pub/Sub message
  const topic = type === "blog" ? "refresh-blog" : "refresh-repo";
  const msg = {
    product,
    id,
    metadata,
    force: true,
  };

  console.log("Topic:", topic);
  console.log("Message:", msg);

  try {
    await pubsub.topic(topic).publishJSON(msg);
  } catch (e) {
    console.log(
      "Failed to send Pub/Sub message, are you authorized with gcloud? Try running gcloud auth application-default login",
      e
    );
  }

  console.log("Message sent, check Cloud Functions logs.");
}

if (require.main === module) {
  main(process.argv);
}

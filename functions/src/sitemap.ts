import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { ALL_PRODUCTS } from "../../shared/product";

const BASE_URL = "https://devlibrary.withgoogle.com";

export async function gatherURLs(): Promise<string[]> {
  const db = admin.firestore();

  // Start with static URLS
  const urls = [`${BASE_URL}`, `${BASE_URL}/authors`, `${BASE_URL}/about`];

  // All product pages
  for (const p of Object.values(ALL_PRODUCTS)) {
    // Base product URL
    const productUrl = `${BASE_URL}/products/${p.key}`;
    urls.push(productUrl);

    // Gather all repos for the product
    const repos = await db
      .collection("products")
      .doc(p.key)
      .collection("repos")
      .get();
    for (const doc of repos.docs) {
      const repoUrl = `${productUrl}/repos/${doc.id}`;
      urls.push(repoUrl);
    }
  }

  // All author pages
  const authors = await db.collection("authors").get();
  for (const doc of authors.docs) {
    const authorUrl = `${BASE_URL}/authors/${doc.id}`;
    urls.push(authorUrl);
  }

  return urls;
}

/**
 * See:
 * https://developers.google.com/search/docs/advanced/sitemaps/build-sitemap#xml
 */
export function generateSitemap(urls: string[]): string {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  for (const url of urls) {
    lines.push("  <url>");
    lines.push(`    <loc>${url}</loc>`);
    lines.push("  </url>");
  }

  lines.push("</urlset>");
  return lines.join("\n");
}

export const sitemap = functions
  .runWith({
    timeoutSeconds: 540,
    memory: "512MB",
  })
  .https.onRequest(async (req, res) => {
    const urls = await gatherURLs();
    const sitemap = generateSitemap(urls);

    // Cache for 12 hours (43200s)
    res.set("Cache-Control", "public, max-age=43200, s-maxage=43200");
    res.set("Content-Type", "text/xml");
    res.status(200).send(sitemap);
  });

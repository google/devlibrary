import { ProductKey } from "../../../shared/types";

export interface ProductTag {
  // The human-readable name (Android, Node.js)
  key: string;

  // The database value (android, node)
  value: string;

  // The color to use, bg-{color}-{number}
  // See: https://tailwindcss.com/docs/background-color
  color: string;
}

export interface ProductConfig {
  key: ProductKey;
  name: string;
  description: string;
  docsUrl: string;

  // We need to explicitly list these so that PurgeCSS keeps them
  classes: {
    bg: string;
    text: string;
    iconBorder: string;
  };

  tags: ProductTag[];
}

export const ALL_PRODUCTS: Record<string, ProductConfig> = {
  firebase: {
    key: ProductKey.FIREBASE,
    name: "Firebase",
    description:
      "Firebase helps you build and run successful apps. Backed by Google and loved by app development teams - from startups to global enterprises",
    docsUrl: "https://firebase.google.com/docs/",
    classes: {
      bg: "bg-firebase-bg",
      text: "text-firebase-text",
      iconBorder: "border-firebase-accent",
    },
    tags: [
      {
        key: "Android",
        value: "android",
        color: "bg-green-500",
      },
      {
        key: "iOS",
        value: "ios",
        color: "bg-blue-500",
      },
      {
        key: "Web",
        value: "web",
        color: "bg-purple-500",
      },
      {
        key: "Games",
        value: "games",
        color: "bg-pink-500",
      },
      {
        key: "Node.js",
        value: "node",
        color: "bg-yellow-500",
      },
      {
        key: "Admin",
        value: "admin",
        color: "bg-gray-500",
      },
    ],
  },
  ml: {
    key: ProductKey.ML,
    name: "Machine Learning",
    description:
      "ML Kit brings Google’s machine learning expertise to mobile developers in a powerful and easy-to-use package. Make your iOS and Android apps more engaging, personalized, and helpful with solutions that are optimized to run on device.",
    docsUrl: "https://developers.google.com/ml-kit",
    classes: {
      bg: "bg-ml-bg",
      text: "text-ml-text",
      iconBorder: "border-ml-accent",
    },
    tags: [
      {
        key: "Mobile",
        value: "mobile",
        color: "bg-blue-500",
      },
      {
        key: "Cloud",
        value: "cloud",
        color: "bg-red-500",
      },
    ],
  },
};

export function getTag(product: string, value: string): ProductTag {
  const p = ALL_PRODUCTS[product];
  const t = p.tags.find((t) => t.value === value);
  if (t) {
    return t;
  }

  console.warn("Warning: unknown tag", value);
  return {
    value,
    key: value.charAt(0).toUpperCase() + value.slice(1),
    color: "bg-gray-500",
  };
}

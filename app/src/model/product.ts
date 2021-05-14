/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ProductKey } from "../../../shared/types";

const TAG_COLORS = [
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-indigo-500",
  "bg-red-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-blue-300",
  "bg-green-300",
  "bg-yellow-700",
  "bg-gray-500",
];

export interface ProductTag {
  // The human-readable name (Android, Node.js)
  key: string;

  // The database value (android, node)
  value: string;
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
      },
      {
        key: "iOS",
        value: "ios",
      },
      {
        key: "Web",
        value: "web",
      },
      {
        key: "Games",
        value: "games",
      },
      {
        key: "Node.js",
        value: "node",
      },
      {
        key: "Admin",
        value: "admin",
      },
    ],
  },
  ml: {
    key: ProductKey.ML,
    name: "Machine Learning",
    description:
      "Machine Learning provides new ways of solving problems that are not solvable with traditional computational approaches. Google provides a wide range of Machine Learning technologies and products for developers to use and develop for their projects.",
    docsUrl: "https://ai.google/tools/",
    classes: {
      bg: "bg-ml-bg",
      text: "text-ml-text",
      iconBorder: "border-ml-accent",
    },
    tags: [
      {
        key: "Mobile",
        value: "mobile",
      },
      {
        key: "NLP",
        value: "nlp",
      },
      {
        key: "Vision",
        value: "vision",
      },
      {
        key: "Library",
        value: "library",
      },
      {
        key: "Notebook",
        value: "notebook",
      },
      {
        key: "Collection",
        value: "collection",
      },
      {
        key: "Web",
        value: "web",
      },
      {
        key: "Theory",
        value: "theory",
      },
    ],
  },
  angular: {
    key: ProductKey.ANGULAR,
    name: "Angular",
    description:
      "Angular is an open-source framework for developing large-scale frontend applications.",
    docsUrl: "https://angular.io/",
    classes: {
      bg: "bg-angular-bg",
      text: "text-angular-text",
      iconBorder: "border-angular-accent",
    },
    tags: [
      {
        key: "Components",
        value: "components",
      },
      {
        key: "Frameworks",
        value: "frameworks",
      },
      {
        key: "Router",
        value: "router",
      },
      {
        key: "Performance",
        value: "performance",
      },
      {
        key: "Getting Started",
        value: "gettingstarted",
      },
    ],
  },
  flutter: {
    key: ProductKey.FLUTTER,
    name: "Flutter",
    description:
      "An open-source UI toolkit that makes it easy and fast to build beautiful mobile apps. Flutter apps run natively on iOS and Android and are powered by the Dart language. ",
    docsUrl: "https://flutter.dev/",
    classes: {
      bg: "bg-flutter-bg",
      text: "text-flutter-text",
      iconBorder: "border-flutter-accent",
    },
    tags: [
      {
        key: "Mobile",
        value: "mobile",
      },
      {
        key: "Firebase",
        value: "firebase",
      },
      {
        key: "Plugins",
        value: "plugins",
      },
      {
        key: "Web",
        value: "web",
      },
      {
        key: "Widgets",
        value: "widgets",
      },
    ],
  },
  cloud: {
    key: ProductKey.CLOUD,
    name: "Google Cloud",
    description:
      "Meet your business challenges head on with cloud computing services from Google, including data management, hybrid & multi-cloud, and AI & ML.",
    docsUrl: "https://cloud.google.com/docs",
    classes: {
      bg: "bg-cloud-bg",
      text: "text-cloud-text",
      iconBorder: "border-cloud-accent",
    },
    // Tags for Cloud are adapted as-needed from the "products" categories list on this page:
    // https://cloud.google.com/products
    tags: [
      {
        key: "AI and Machine Learning",
        value: "ai-ml",
      },
      {
        key: "API Management",
        value: "api-management",
      },
      {
        key: "Compute",
        value: "compute",
      },
      {
        key: "Containers",
        value: "containers",
      },
      {
        key: "Data Analytics",
        value: "data-analytics",
      },
      {
        key: "Databases",
        value: "databases",
      },
      {
        key: "Developer Tools",
        value: "developer-tools",
      },
      {
        key: "Healthcare and Life Sciences",
        value: "healthcare-life-sciences",
      },
      {
        key: "Hybrid and Multicloud",
        value: "hybrid-multicloud",
      },
      {
        key: "Internet of Things",
        value: "iot",
      },
      {
        key: "Management Tools",
        value: "management-tools",
      },
      {
        key: "Media and Gaming",
        value: "media-gaming",
      },
      {
        key: "Migration",
        value: "migration",
      },
      {
        key: "Networking",
        value: "networking",
      },
      {
        key: "Operations",
        value: "operations",
      },
      {
        key: "Security and Identity",
        value: "security-identity",
      },
      {
        key: "Serverless Computing",
        value: "serverless-computing",
      },
      {
        key: "Storage",
        value: "storage",
      },
    ],
  },
  android: {
    key: ProductKey.ANDROID,
    name: "Android",
    description:
      "Modern tools and resources to help you build experiences that people love, faster and easier, across every Android device.",
    docsUrl: "https://developer.android.com/",
    classes: {
      bg: "bg-android-bg",
      text: "text-android-text",
      iconBorder: "border-android-accent",
    },
    tags: [
      {
        key: "Build/Tools",
        value: "build-tools",
      },
      {
        key: "Compose",
        value: "compose",
      },
      {
        key: "Architecture",
        value: "architecture",
      },
      {
        key: "Kotlin",
        value: "kotlin",
      },
      {
        key: "Samples",
        value: "samples",
      },
    ],
  },
};

export function getTag(product: string, value: string) {
  const p = ALL_PRODUCTS[product];
  const ind = p.tags.findIndex((t) => t.value === value);

  if (ind < 0) {
    console.warn("Warning: unknown tag", value);
    return {
      label: value.charAt(0).toUpperCase() + value.slice(1),
    };
  }

  const t = p.tags[ind];
  return {
    label: t.key,
    color: TAG_COLORS[ind % TAG_COLORS.length],
  };
}

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
        color: "bg-blue-500",
      },
      {
        key: "NLP",
        value: "nlp",
        color: "bg-green-500",
      },
      {
        key: "Vision",
        value: "vision",
        color: "bg-yellow-500",
      },
      {
        key: "Library",
        value: "library",
        color: "bg-pink-500",
      },
      {
        key: "Notebook",
        value: "notebook",
        color: "bg-black",
      },
      {
        key: "Collection",
        value: "collection",
        color: "bg-indigo-500",
      },
      {
        key: "Web",
        value: "web",
        color: "bg-red-700",
      },
      {
        key: "Theory",
        value: "theory",
        color: "bg-gray-500",
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
        color: "bg-blue-500",
      },
      {
        key: "Frameworks",
        value: "frameworks",
        color: "bg-red-500",
      },
      {
        key: "Router",
        value: "router",
        color: "bg-gray-500",
      },
      {
        key: "Performance",
        value: "performance",
        color: "bg-yellow-500",
      },
      {
        key: "Getting Started",
        value: "gettingstarted",
        color: "bg-green-500",
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
        color: "bg-blue-500",
      },
      {
        key: "Firebase",
        value: "firebase",
        color: "bg-green-500",
      },
      {
        key: "Plugins",
        value: "plugins",
        color: "bg-red-500",
      },
      {
        key: "Web",
        value: "web",
        color: "bg-purple-500",
      },
      {
        key: "Widgets",
        value: "widgets",
        color: "bg-gray-500",
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
        key: "Compute",
        value: "compute",
        color: "bg-blue-500",
      },
      {
        key: "Containers",
        value: "containers",
        color: "bg-blue-500",
      },
      {
        key: "Databases",
        value: "databases",
        color: "bg-red-500",
      },
      {
        key: "Data Analytics",
        value: "data-analytics",
        color: "bg-gray-500",
      },
      {
        key: "Internet of Things",
        value: "iot",
        color: "bg-gray-500",
      },
      {
        key: "Networking",
        value: "networking",
        color: "bg-yellow-500",
      },
      {
        key: "Operations",
        value: "operations",
        color: "bg-yellow-500",
      },
      {
        key: "Serverless Computing",
        value: "serverless-computing",
        color: "bg-green-500",
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

"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALL_PRODUCTS = void 0;
var types_1 = require("./types");
exports.ALL_PRODUCTS = {
    firebase: {
        key: types_1.ProductKey.FIREBASE,
        name: "Firebase",
        description: "Firebase helps you build and run successful apps. Backed by Google and loved by app development teams - from startups to global enterprises",
        docsUrl: "https://firebase.google.com/docs/",
        tags: [
            {
                label: "Android",
                value: "android",
            },
            {
                label: "iOS",
                value: "ios",
            },
            {
                label: "Web",
                value: "web",
            },
            {
                label: "Games",
                value: "games",
            },
            {
                label: "Node.js",
                value: "node",
            },
            {
                label: "Admin",
                value: "admin",
            },
            {
                label: "Flutter",
                value: "flutter",
            },
        ],
    },
    ml: {
        key: types_1.ProductKey.ML,
        name: "Machine Learning",
        description: "Machine Learning provides new ways of solving problems that are not solvable with traditional computational approaches. Google provides a wide range of Machine Learning technologies and products for developers to use and develop for their projects.",
        docsUrl: "https://ai.google/tools/",
        tags: [
            {
                label: "Mobile",
                value: "mobile",
            },
            {
                label: "NLP",
                value: "nlp",
            },
            {
                label: "Vision",
                value: "vision",
            },
            {
                label: "Library",
                value: "library",
            },
            {
                label: "Notebook",
                value: "notebook",
            },
            {
                label: "Collection",
                value: "collection",
            },
            {
                label: "Web",
                value: "web",
            },
            {
                label: "Theory",
                value: "theory",
            },
        ],
    },
    angular: {
        key: types_1.ProductKey.ANGULAR,
        name: "Angular",
        description: "Angular is an open-source framework for developing large-scale frontend applications.",
        docsUrl: "https://angular.io/",
        tags: [
            {
                label: "Components",
                value: "components",
            },
            {
                label: "Frameworks",
                value: "frameworks",
            },
            {
                label: "Router",
                value: "router",
            },
            {
                label: "Performance",
                value: "performance",
            },
            {
                label: "Getting Started",
                value: "gettingstarted",
            },
            {
                label: "Libraries",
                value: "libraries",
            },
            {
                label: "Demos",
                value: "demos",
            },
        ],
    },
    flutter: {
        key: types_1.ProductKey.FLUTTER,
        name: "Flutter",
        description: "An open-source UI toolkit that makes it easy and fast to build beautiful mobile apps. Flutter apps run natively on iOS and Android and are powered by the Dart language. ",
        docsUrl: "https://flutter.dev/",
        tags: [
            {
                label: "Mobile",
                value: "mobile",
            },
            {
                label: "Firebase",
                value: "firebase",
            },
            {
                label: "Plugins",
                value: "plugins",
            },
            {
                label: "Web",
                value: "web",
            },
            {
                label: "Widgets",
                value: "widgets",
            },
            {
                label: "General",
                value: "general",
            },
            {
                label: "Samples",
                value: "samples",
            },
        ],
    },
    cloud: {
        key: types_1.ProductKey.CLOUD,
        name: "Google Cloud",
        description: "Meet your business challenges head on with cloud computing services from Google, including data management, hybrid & multi-cloud, and AI & ML.",
        docsUrl: "https://cloud.google.com/docs",
        // Tags for Cloud are adapted as-needed from the "products" categories list on this page:
        // https://cloud.google.com/products
        tags: [
            {
                label: "AI and Machine Learning",
                value: "ai-ml",
            },
            {
                label: "API Management",
                value: "api-management",
            },
            {
                label: "Compute",
                value: "compute",
            },
            {
                label: "Containers",
                value: "containers",
            },
            {
                label: "Data Analytics",
                value: "data-analytics",
            },
            {
                label: "Databases",
                value: "databases",
            },
            {
                label: "Developer Tools",
                value: "developer-tools",
            },
            {
                label: "Healthcare and Life Sciences",
                value: "healthcare-life-sciences",
            },
            {
                label: "Hybrid and Multicloud",
                value: "hybrid-multicloud",
            },
            {
                label: "Internet of Things",
                value: "iot",
            },
            {
                label: "Management Tools",
                value: "management-tools",
            },
            {
                label: "Media and Gaming",
                value: "media-gaming",
            },
            {
                label: "Migration",
                value: "migration",
            },
            {
                label: "Networking",
                value: "networking",
            },
            {
                label: "Operations",
                value: "operations",
            },
            {
                label: "Security and Identity",
                value: "security-identity",
            },
            {
                label: "Serverless Computing",
                value: "serverless-computing",
            },
            {
                label: "Storage",
                value: "storage",
            },
        ],
    },
    android: {
        key: types_1.ProductKey.ANDROID,
        name: "Android",
        description: "Modern tools and resources to help you build experiences that people love, faster and easier, across every Android device.",
        docsUrl: "https://developer.android.com/",
        tags: [
            {
                label: "Build/Tools",
                value: "build-tools",
            },
            {
                label: "Compose",
                value: "compose",
            },
            {
                label: "Architecture",
                value: "architecture",
            },
            {
                label: "Kotlin",
                value: "kotlin",
            },
            {
                label: "Samples",
                value: "samples",
            },
            {
                label: "Modern Android Development",
                value: "modern-android-development",
            },
            {
                label: "UI",
                value: "ui",
            },
        ],
    },
};

export interface ProductConfig {
  key: string;
  name: string;
  description: string;
  docsUrl: string;
}

export const ALL_PRODUCTS: Record<string, ProductConfig> = {
  firebase: {
    key: "firebase",
    name: "Firebase",
    description:
      "Firebase helps you build and run successful apps. Backed by Google and loved by app development teams - from startups to global enterprises",
    docsUrl: "https://firebase.google.com/docs/",
  },
  ml: {
    key: "ml",
    name: "Machine Learning",
    description:
      "ML Kit brings Google’s machine learning expertise to mobile developers in a powerful and easy-to-use package. Make your iOS and Android apps more engaging, personalized, and helpful with solutions that are optimized to run on device.",
    docsUrl: "https://developers.google.com/ml-kit",
  },
};

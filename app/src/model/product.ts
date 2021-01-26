export interface ProductConfig {
  key: string;
  name: string;
  description: string;
  docsUrl: string;

  // We need to explicitly list these so that PurgeCSS keeps them
  classes: {
    bg: string;
    text: string;
    iconBorder: string;
  };
}

export const ALL_PRODUCTS: Record<string, ProductConfig> = {
  firebase: {
    key: "firebase",
    name: "Firebase",
    description:
      "Firebase helps you build and run successful apps. Backed by Google and loved by app development teams - from startups to global enterprises",
    docsUrl: "https://firebase.google.com/docs/",
    classes: {
      bg: "bg-firebase-bg",
      text: "text-firebase-text",
      iconBorder: "border-firebase-accent",
    },
  },
  ml: {
    key: "ml",
    name: "Machine Learning",
    description:
      "ML Kit brings Google’s machine learning expertise to mobile developers in a powerful and easy-to-use package. Make your iOS and Android apps more engaging, personalized, and helpful with solutions that are optimized to run on device.",
    docsUrl: "https://developers.google.com/ml-kit",
    classes: {
      bg: "bg-ml-bg",
      text: "text-ml-text",
      iconBorder: "border-ml-accent",
    },
  },
};

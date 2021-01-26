export interface BlogMetadata {
  // (required) Blog author and title of the blog
  // ex: author=biswajeet, title="How to use firebase", link = "https://medium.com/xxx.html"
  author: string;
  title: string;
  link: string;

  // (optional) Product-specific tags
  tags?: string[];
}

export interface BlogData {
  metadata: BlogMetadata;
  stats: {
    minutes: number;
  };
}

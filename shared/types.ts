export interface GitHubProjectMetadata {
  // TODO: Source and version

  // (required) GitHub owner and repo
  // ex: owner=firebase, repo=quickstart-android
  owner: string;
  repo: string;

  // (required) Display name and description
  // ex: name="FirebaseUI for Android", description="A UI helper library"
  name: string;

  // (required) Descriptions for display
  shortDescription: string;
  longDescription: string;

  // (required) Path to the main content page
  // ex: README.md
  content: string;

  // (optional) Product-specific tags
  tags?: string[];

  // (optional) Information about additional content pages. These pages
  // will be presented in the order listed here but the hierarchy
  // is always flat (no nesting)
  //
  // ex: [
  //    {
  //      name: "Installing",
  //      path: "docs/installing.md",
  //    },
  //    {
  //      name: "Getting Started",
  //      content_path: "docs/guides/basic.md",
  //    }
  // ]
  pages?: { name: string; path: string }[];

  // (optional) Links to important external project resources
  // ex: [
  //    { title: "Forum", "https://forums.io/whatever" },
  //    { title: "Donate", "https://patreon.com/whatever }
  // ]
  links?: { title: string; href: string }[];

  // (optional) Related projects that are also on the UGC site
  // ex: [
  //    { type: "repo", id: "github/firebase/foo" },
  //    { type: "blog", id: "medium/firebase/bar" }
  // ]
  related?: { type: string; id: string }[];
}

export interface GithubProjectStats {
  stars: number;
  forks: number;
  lastUpdated: number;
}

export interface GitHubProject {
  metadata: GitHubProjectMetadata;
  stats: GithubProjectStats;
}

export interface BlogMetadata {
  // (required) Blog author and title of the blog
  // ex: author=biswajeet, title="How to use firebase", link = "https://medium.com/xxx.html"
  author: string;
  title: string;
  link: string;

  // (optional) Product-specific tags
  tags?: string[];
}

export interface BlogStats {
  minutes: number;
  lastUpdated: number;
}

export interface BlogData {
  metadata: BlogMetadata;
  stats: BlogStats;
}

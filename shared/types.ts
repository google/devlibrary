export interface RepoMetadata {
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

export interface RepoStats {
  stars: number;
  forks: number;
  lastUpdated: number;
}

export interface RepoData {
  id: string;
  metadata: RepoMetadata;
  stats: RepoStats;
}

export interface RepoPage {
  name: string;
  path: string;
  sections: RepoPageSection[];
}

export interface RepoPageSection {
  name: string;
  content: string;
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
  id: string;
  metadata: BlogMetadata;
  stats: BlogStats;
}

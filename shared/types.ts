export enum ProductKey {
  FIREBASE = "firebase",
  ML = "ml",
}

/**
 * These two types are defined in JSON schema so that we can validate them easily.
 */
import { BlogMetadata } from "./types/BlogMetadata";
import { RepoMetadata } from "./types/RepoMetadata";

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

export interface RepoPageSection {
  name: string;
  content: string;
}

export interface RepoPage {
  name: string;
  path: string;
  sections: RepoPageSection[];
}

export interface BlogStats {
  minutes: number;
  claps: number;
  lastUpdated: number;
}

export interface BlogData {
  id: string;
  metadata: BlogMetadata;
  stats: BlogStats;
}

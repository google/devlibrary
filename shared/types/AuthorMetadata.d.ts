/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * AuthorMetadata
 */
export interface AuthorMetadata {
  /**
   * The author's name
   */
  name: string;
  /**
   * Short author bio
   */
  bio: string;
  /**
   * Public URL to their profile photo
   */
  photoURL: string;
  /**
   * YouTube video id for their video interview
   */
  interviewVideoId?: string;
  /**
   * Public URL to their GitHub profile
   */
  githubURL?: string;
  /**
   * Public URL to their Medium profile
   */
  mediumURL?: string;
  [k: string]: unknown;
}

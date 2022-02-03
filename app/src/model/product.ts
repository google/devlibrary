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
import { ALL_PRODUCTS } from "../../../shared/product";

export type ProductStyle = {
  bg: string;
  text: string;
  iconBorder: string;
};

const styles: Record<string, ProductStyle> = {
  android: {
    bg: "bg-android-bg",
    text: "text-android-text",
    iconBorder: "border-android-accent",
  },
  angular: {
    bg: "bg-angular-bg",
    text: "text-angular-text",
    iconBorder: "border-angular-accent",
  },
  cloud: {
    bg: "bg-cloud-bg",
    text: "text-cloud-text",
    iconBorder: "border-cloud-accent",
  },
  firebase: {
    bg: "bg-firebase-bg",
    text: "text-firebase-text",
    iconBorder: "border-firebase-accent",
  },
  flutter: {
    bg: "bg-flutter-bg",
    text: "text-flutter-text",
    iconBorder: "border-flutter-accent",
  },
  ml: {
    bg: "bg-ml-bg",
    text: "text-ml-text",
    iconBorder: "border-ml-accent",
  },
  assistant: {
    bg: "bg-assistant-bg",
    text: "text-assistant-text",
    iconBorder: "border-assistant-accent",
  },
};

// Listing these classes here means that PurgeCSS will not
// drop them.
const TAG_BG_COLORS = [
  "bg-blue-50",
  "bg-green-50",
  "bg-yellow-50",
  "bg-indigo-50",
  "bg-red-50",
  "bg-purple-50",
  "bg-pink-50",
];

const TAG_TEXT_COLORS = [
  "text-blue-500",
  "text-green-500",
  "text-yellow-500",
  "text-indigo-500",
  "text-red-500",
  "text-purple-500",
  "text-pink-500",
];

export function getStyle(product: string) {
  return styles[product];
}

export function getTag(product: string, value: string) {
  const p = ALL_PRODUCTS[product];
  const ind = p.tags.findIndex((t) => t.value === value);

  if (ind < 0) {
    console.warn("Warning: unknown tag", value);
    return {
      label: value.charAt(0).toUpperCase() + value.slice(1),
      color: "bg-gray-500",
    };
  }

  const t = p.tags[ind];
  return {
    label: t.label,
    textColor: TAG_TEXT_COLORS[ind % TAG_TEXT_COLORS.length],
    bgColor: TAG_BG_COLORS[ind % TAG_BG_COLORS.length],
  };
}

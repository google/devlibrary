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

const DAY_MS = 24 * 60 * 60 * 1000;

export function renderDaysAgo(lastUpdated: number) {
  const now = new Date();

  const diff = now.getTime() - lastUpdated;
  const daysAgo = Math.floor(diff / DAY_MS);

  if (daysAgo <= 0) {
    return "today";
  } else if (daysAgo === 1) {
    return "yesterday";
  } else if (daysAgo > 30) {
    const lastUpdatedDate = new Date(lastUpdated);
    let monthsAgo = (now.getFullYear() - lastUpdatedDate.getFullYear()) * 12;
    monthsAgo = monthsAgo + now.getMonth() - lastUpdatedDate.getMonth();
    return `${monthsAgo} month${monthsAgo === 1 ? "" : "s"} ago`;
  } else {
    return `${daysAgo} days ago`;
  }
}

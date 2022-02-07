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

export function renderMonthsAgo(lastUpdated: number) {
  const now = new Date().getTime();
  const monthsAgo = new Date().getMonth();

  const diff = now - lastUpdated;
  const daysAgo = Math.floor(diff / DAY_MS);
 

  if (monthsAgo <= 0) {
    return "today";
  } else if (monthsAgo === 1) {
    return "yesterday";
  } else if(monthsAgo<=30)
  {
    return `${daysAgo} days ago`;
  }
  else {
    return `${monthsAgo} months ago`;
  }
console.log(daysAgo)
}


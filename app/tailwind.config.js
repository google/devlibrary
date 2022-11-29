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

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: [
      "./src/**/*.vue",
      "./src/components/**/*.vue",
      "./src/views/**/*.vue",
      "./src/**/*.ts",
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Roboto", "ui-sans-serif", "system-ui"],
      display: ["Google Sans", "Roboto", "ui-sans-serif", "system-ui"],
    },
    extend: {
      colors: {
        firebase: {
          accent: "#FFCA28",
          bg: "#1A73E8",
          text: "#FFFFFF",
        },
        ml: {
          accent: "#4285F4",
          bg: "#F1F3F4",
          text: "#1F2937",
        },
        angular: {
          accent: "#DD0031",
          bg: "#1976D2",
          text: "#FFFFFF",
        },
        flutter: {
          accent: "#13B9FD",
          bg: "#F1F3F4",
          text: "#1F2937",
        },
        cloud: {
          accent: "#EA4335",
          bg: "#4285F4",
          text: "#FFFFFF",
        },
        android: {
          accent: "#3FDC84",
          bg: "#073042",
          text: "#FFFFFF",
        },

        assistant: {
          accent: "#9AA0A6",
          bg: "#4285F4",
          text: "#FFFFFF",
        },
        gblue: {
          50: "#e8f0fe",
          100: "#d2e3fc",
          200: "#aecbfa",
          300: "#8ab4f8",
          400: "#669df6",
          500: "#4285f4",
          600: "#1a73e8",
          700: "#1967d2",
          800: "#185abc",
          900: "#174ea6",
        },
        mgray: {
          900: "#202124",
          800: "#3c4043",
          700: "#5f6368",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: null,
            "blockquote p::before": {
              display: "none",
            },
            "code::before": {
              display: "none",
            },
            "code::after": {
              display: "none",
            },
            table: {
              width: null,
            },
            thead: null,
            "thead th": null,
            "thead th:first-child": null,
            "thead th:last-child": null,
          },
        },
      },
    },
  },
  variants: {
    extend: {
      textColor: ["last"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

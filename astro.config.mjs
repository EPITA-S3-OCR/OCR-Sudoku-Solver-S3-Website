import { defineConfig } from "astro/config";
import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [
      remarkReadingTime,
      "remark-math",
      "remark-gfm",
      "remark-toc",
    ],
    rehypePlugins: [
      "rehype-figure",
      "rehype-katex",
      "rehype-plugin-image-native-lazy-loading",
    ],
    extendDefaultPlugins: true,
  },
  integrations: [
    tailwind(),
    mdx(),
    preact(),
    image(),
    prefetch({ selector: "a" }),
  ],
});
function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}

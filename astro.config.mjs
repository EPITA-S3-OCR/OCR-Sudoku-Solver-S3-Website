import { defineConfig } from "astro/config";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

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
      // "rehype-mathjax",
      "rehype-katex",
      // [
      //   "rehype-katex",
      //   {
      //     strict: true,
      //   },
      // ],
    ],
    extendDefaultPlugins: true,
  },
  integrations: [tailwind(), mdx(), preact()],
});
import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}

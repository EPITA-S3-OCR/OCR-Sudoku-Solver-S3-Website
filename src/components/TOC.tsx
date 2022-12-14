import { unescape } from "html-escaper";
import type { FunctionalComponent } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";

interface Props {
  headings: { depth: number; slug: string; text: string }[];
  time: string;
}

const TableOfContents: FunctionalComponent<Props> = ({
  time,
  headings = [],
}) => {
  headings = headings.filter(({ depth }) => depth > 1 && depth < 4);

  const toc = useRef<HTMLUListElement>();
  const [currentID, setCurrentID] = useState("overview");
  const onThisPageID = "on-this-page-heading";
  useEffect(() => {
    if (!toc.current) return;

    const setCurrent: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const { id } = entry.target;
          if (id === onThisPageID) continue;
          setCurrentID(entry.target.id);
          break;
        }
      }
    };

    const observerOptions: IntersectionObserverInit = {
      // Negative top margin accounts for `scroll-margin`.
      // Negative bottom margin means heading needs to be towards top of viewport to trigger intersection.
      // rootMargin: "-100px 0% -66%",
      rootMargin: "0% 0% -50%",
      threshold: 1,
    };

    const headingsObserver = new IntersectionObserver(
      setCurrent,
      observerOptions
    );

    // Observe all the headings in the main page content.
    document
      .querySelectorAll("article :is(h2,h3)")
      // .querySelectorAll("article :is(h1,h2,h3)")
      .forEach((h) => headingsObserver.observe(h));

    // Stop observing when the component is unmounted.
    return () => headingsObserver.disconnect();
  }, [toc.current]);

  const onLinkClick = (e) => {
    e.preventDefault();
    // scroll into view
    const target = document.getElementById(e.target.hash.slice(1));
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <div className="mr-4 block   rounded-md p-4">
      <div className="pb-4">
        <h2 class="text-2xl font-bold" id={onThisPageID}>
          Table of Contents
        </h2>
        <span>{time}</span>
      </div>
      <ul ref={toc} class="max-w-[30ch]">
        {headings.map(({ depth, slug, text }) => {
          return (
            <li
              class={`header-link list-outside list-none border-l-4 p-0 px-4 ${
                currentID === slug
                  ? "border-gray-50 bg-gray-800"
                  : "border-gray-800"
              }`.trim()}
            >
              <a
                className={currentID === slug ? "text-white" : " text-white/50"}
                style={{ marginLeft: (depth - 2) * 16 + "px" }}
                href={`#${slug}`}
                onClick={onLinkClick}
              >
                {unescape(text)}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TableOfContents;

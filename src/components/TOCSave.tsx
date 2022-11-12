import { unescape } from "html-escaper";
import type { FunctionalComponent } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";

interface Props {
  headings: { depth: number; slug: string; text: string }[];
  labels: {
    onThisPage: string;
    overview: string;
  };
  isMobile?: boolean;
}

const TableOfContents: FunctionalComponent<Props> = ({
  headings = [],
  labels,
  isMobile,
}) => {
  headings = [
    { depth: 2, slug: "overview", text: labels.overview },
    ...headings,
  ].filter(({ depth }) => depth > 1 && depth < 4);
  const toc = useRef<HTMLUListElement>();
  const [currentID, setCurrentID] = useState("overview");
  const [open, setOpen] = useState(!isMobile);
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
      rootMargin: "-100px 0% -66%",
      threshold: 1,
    };

    const headingsObserver = new IntersectionObserver(
      setCurrent,
      observerOptions
    );

    // Observe all the headings in the main page content.
    document
      .querySelectorAll("article :is(h1,h2,h3)")
      .forEach((h) => headingsObserver.observe(h));

    // Stop observing when the component is unmounted.
    return () => headingsObserver.disconnect();
  }, [toc.current]);

  const onLinkClick = (e) => {
    if (!isMobile) return;
    setOpen(false);
    setCurrentID(e.target.getAttribute("href").replace("#", ""));
  };
  // console.log(headings.map(({ text }) => text))
  return (
    <div className="">
      <div className="">
        <h2 class="heading" id={onThisPageID}>
          {labels.onThisPage}
        </h2>
      </div>
      <ul ref={toc} className="bg-green-500">
        {headings.map(({ depth, slug, text }) => (
          <li
            class={`header-link depth-${depth} ${
              currentID === slug ? "bg-violet-500  current-header-link" : ""
            }`.trim()}
          >
            <a href={`#${slug}`} onClick={onLinkClick}>
              {unescape(text)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;

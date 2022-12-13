import { useEffect } from "preact/hooks";

const GoBackToTop = () => {
  // Go to top of the page when button is clicked
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  // show button when user scrolls down 20px from the top of the document
  useEffect(() => {
    const showButton = () => {
      const button = document.querySelector(".go-back-to-top");
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        button.classList.remove("opacity-0");
      } else {
        button.classList.add("opacity-0");
      }
    };
    window.addEventListener("scroll", showButton);
    return () => window.removeEventListener("scroll", showButton);
  }, []);

  return (
    <button
      onClick={goToTop}
      class="go-back-to-top opacity-0 duration-1000 transition-all bg-gray-700 rounded-full text-white p-2"
    >
      <svg width="24" height="24" viewBox="0 0 256 256">
        <path
          fill="currentColor"
          d="M208.5 120.5a12.1 12.1 0 0 1-17 0L140 69v147a12 12 0 0 1-24 0V69l-51.5 51.5a12 12 0 0 1-17-17l72-72a12 12 0 0 1 17 0l72 72a12 12 0 0 1 0 17Z"
        />
      </svg>
    </button>
  );
};

export default GoBackToTop;

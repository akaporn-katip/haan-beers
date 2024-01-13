import { useRef } from "react";

export default function ShareButton({ children, title, text, url }) {
  async function share() {
    if (navigator.canShare && navigator.canShare())
      await navigator.share({
        title,
        text,
        url,
      });
    if (navigator.clipboard)
      navigator.clipboard.writeText(`${title} - ${text} : ${url}`);
  }

  function selectAll(e) {
    e.target.select()
  }



  return (
    <>
      <div>
        <input
          name="share-url"
          className="border rounded-md py-2"
          readOnly
          value={`${title} - ${text} : ${url}`}
          onClick={selectAll}
        />
      </div>
      <div>
        <button
          className="flex items-center bg-share-button py-2 px-4 rounded-md text-white"
          onClick={share}
        >
          <div>{children}</div>
        </button>
      </div>
    </>
  );
}

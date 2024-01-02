export default function ShareButton({ children, title, text, url }) {
  function share() {
    if (navigator.canShare && navigator.canShare())
      navigator.share({
        title,
        text,
        url,
      });
    else navigator.clipboard.writeText(`${title} - ${text} : ${url}`);
  }
  return (
    <button
      className="flex items-center bg-share-button py-2 px-4 rounded-md text-white"
      onClick={share}
    >
      <div>{children}</div>
    </button>
  );
}

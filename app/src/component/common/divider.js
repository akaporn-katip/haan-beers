export default function Divider({ children }) {
  return (
    <div className="relative flex items-center">
      <div className="flex-grow border-t border-gray-400"></div>
      <span className="flex-shrink mx-4 text-gray-400">{children}</span>
      <div className="flex-grow border-t border-gray-400"></div>
    </div>
  );
}
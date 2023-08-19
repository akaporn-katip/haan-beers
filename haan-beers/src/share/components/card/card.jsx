export default function Card({ children, sticky }) {
  return <div className={`card ${sticky ? "sticky top-2" : ""}`}>{children}</div>;
}

Card.Title = function Title({ children }) {
  return <div className="card-title">{children}</div>;
};

Card.Body = function Body({ children }) {
  return <div className="card-body">{children}</div>;
};

Card.Action = function Action({ children }) {
  return <div className="card-action">{children}</div>;
};

import AppBar from "../component/common/appbar";

export default function MainLayout({ children }) {
  return (
    <>
      <div className="container">
        <AppBar />
        {children}
      </div>
    </>
  );
}

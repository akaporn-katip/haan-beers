import AppBar from "../component/common/appbar";
import Header from "../component/common/header";

export default function MainLayout({ children }) {
  return (
    <>
      <Header></Header>
      <div className="container h-full">
        <AppBar />
        {children}
      </div>
    </>
  );
}

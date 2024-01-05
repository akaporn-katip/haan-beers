import { Helmet } from "react-helmet";

export default function Header({ children }) {
  return (
    <Helmet
      titleTemplate="%s | หารเบียร์ | haan-beer.katipwork.com"
      defaultTitle="หารเบียร์ | haan-beer.katipwork.com"
    >
      {children}
    </Helmet>
  );
}

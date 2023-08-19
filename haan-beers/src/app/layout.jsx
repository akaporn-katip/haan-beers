"use client";
import * as Redux from "react-redux";
import store from "../store";
import "styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Itim } from "next/font/google";
const itim = Itim({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-itim",
  weight: "400",
});

export default function RootLayout({ children, ...props }) {
  return (
    <html lang="en" className={itim.variable}>
      <head></head>
      {/* 
      TODO: Remove before production or change to false
      This suppressHydrationWarning will disable warning from NextJs "Extra attributes from the server: data-new-gr-c-s-check-loaded... "
      URL: https://stackoverflow.com/questions/75337953/what-causes-nextjs-warning-extra-attributes-from-the-server-data-new-gr-c-s-c
      */}
      <body suppressHydrationWarning={true}>
        <SessionProvider session={props.session}>
          <Redux.Provider store={store}>{children}</Redux.Provider>
        </SessionProvider>
      </body>
    </html>
  );
}

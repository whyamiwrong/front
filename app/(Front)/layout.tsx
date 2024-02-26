import "./globals.css";

import * as React from "react";
import Box from "@mui/material/Box";
import ThemeRegistry from "components/ThemeRegistry/ThemeRegistry";

import Header from "components/auth/header";
import Menu from "components/shared/menu";
import Wrapper from "@/components/shared/wrapper";
import Hotjar from "@/lib/hotjar";

export const metadata = {
  title: "WhyAmIWrong",
  description: "맞았는데 왜 틀렸지?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko-KR">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        {process.env.NODE_ENV === "production" && <Hotjar />}
      </head>
      <body>
        <ThemeRegistry>
          <Header />
          {/* <Menu /> */}
          <Wrapper>{children}</Wrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}

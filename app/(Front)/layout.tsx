
import './globals.css';

import * as React from "react";
import Box from "@mui/material/Box";
import ThemeRegistry from "components/ThemeRegistry/ThemeRegistry";

import Header from "components/auth/header";
import Menu from "components/shared/menu";
import Wrapper from "@/components/shared/wrapper";
import { RecoilRoot } from 'recoil';

export const metadata = {
  title: "맞왜틀",
  description: "맞았는데 왜 틀렸지?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <html lang="ko-KR">
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

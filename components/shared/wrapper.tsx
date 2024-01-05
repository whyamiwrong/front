"use client";

import { usePathname } from "next/navigation";

import * as React from "react";
import Box from "@mui/material/Box";

const DRAWER_WIDTH = 240;

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/login") || pathname.startsWith("/api")) {
    return <>{children}</>;
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        bgcolor: "background.default",
        // ml: `${DRAWER_WIDTH}px`,
        mt: ["48px", "56px", "64px"],
        mx: ["16px", "36px", "48px"],
        pt: 3,
        px: "8px",
      }}
    >
      {children}
    </Box>
  );
}

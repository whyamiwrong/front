"use client";
import { usePathname } from "next/navigation";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import DashboardIcon from "@mui/icons-material/Dashboard";

export default function Header() {
  const pathname = usePathname();
  if (pathname.startsWith("/login") || pathname.startsWith("/api")) {
    return <></>;
  }

  return (
    <AppBar position="fixed" sx={{ zIndex: 2000 }}>
      <Toolbar sx={{ backgroundColor: "background.paper" }}>
        <DashboardIcon
          sx={{ color: "#444", mr: 2, transform: "translateY(-2px)" }}
        />
        <Typography variant="h6" color="text.primary">
          Next.js App Router
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

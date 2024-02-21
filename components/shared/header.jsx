"use client";
import { usePathname } from "next/navigation";
import axios from "axios";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Button, Stack } from "@mui/material";
import Link from "next/link";
import { LuMenu } from "react-icons/lu";

export default function Header({ auth_user = false }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(0);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 마운트 해제될 때 이벤트 리스너 해제
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = async () => {
    const res = await axios.get("/api/auth/logout");

    if (res.status !== 200) {
      alert("로그아웃에 실패했습니다.");
      return;
    } else {
      window.location.href = "/";
    }
  }

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  if (pathname.startsWith("/login") || pathname.startsWith("/api")) {
    return <></>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ zIndex: 2000 }}>
        <Toolbar sx={{ backgroundColor: "background.paper", display: 'flex', justifyContent: 'space-between' }}>
          {/* 왼쪽 영역 */}
          {windowWidth <= 790 ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                size="large"
                edge="start"
                color="black"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ mr: '2px' }}
              >
              <LuMenu />  
              </IconButton>
              <Link href="/" style={{ textDecoration: 'none' }}>
                {/* <Typography variant="h6" color="text.primary" sx={{ cursor: 'pointer' }}>
                  WhyamiWrong
                </Typography> */}
              </Link>
            </Box>
          ) : (
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Typography variant="h6" color="text.primary" sx={{ mr: '16px', cursor: 'pointer' }}>
                WhyamiWrong
              </Typography>
            </Link>
          )}

          {/* 오른쪽 영역 */}
          <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {windowWidth > 790 ? (
              <Stack direction="row" spacing={2}>
                {windowWidth > 790 && (
                  <>
                    <Button href="/algorithm" color="secondary">
                      Algorithm
                    </Button>
                    <Button href="/snack-quiz" color="secondary">
                      Snack Quiz
                    </Button>
                    
                    <Button href="/ranking" color="secondary">
                      Ranking
                    </Button>
                  </>
                )}
                <Box sx={{ display: 'flex', gap: '8px' }}>
                  {!auth_user ? (
                    <>
                      <Button variant="outlined" size="small" color="secondary" href="/login">로그인</Button>
                      <Button variant="contained" size="small" color="secondary" href="/signup" sx={{boxShadow: 'none'}}>회원가입</Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outlined" size="small" color="secondary" onClick={handleLogout}>{auth_user?.username} 로그아웃</Button>
                      <Button variant="contained" size="small" color="secondary" sx={{boxShadow: 'none'}} href="/">내 정보</Button>
                    </>
                  )}
                </Box>
              </Stack>
            ) : (
              <Box sx={{ display: 'flex', gap: '8px' }}>
                {windowWidth > 790 && (
                  <>
                    <Button href="/algorithm" color="secondary">
                      Algorithm
                    </Button>
                    <Button href="/snack-quiz" color="secondary">
                      Snack Quiz
                    </Button>
                    
                    <Button href="/ranking" color="secondary">
                      Ranking
                    </Button>
                  </>
                )}
                {!auth_user ? (
                  <>
                    <Button variant="outlined" size="small" color="secondary" href="/login">로그인</Button>
                    <Button variant="contained" size="small" color="secondary" href="/signup" sx={{boxShadow: 'none'}}>회원가입</Button>
                  </>
                ) : (
                  <>
                    <Button variant="outlined" size="small" color="secondary" onClick={handleLogout}>{auth_user?.username} 로그아웃</Button>
                    <Button variant="contained" size="small" color="secondary" sx={{boxShadow: 'none'}} href="/">내 정보</Button>
                  </>
                )}
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* 햄버거 메뉴 */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', p: '16px' }}>
            <br/><br/>
            <Button href="/" color="secondary">
              WhyamiWrong
            </Button>
            <Button href="/algorithm" color="secondary">
              Algorithm
            </Button>
            <Button href="/snack-quiz" color="secondary">
              Snack Quiz
            </Button>
            
            <Button href="/ranking" color="secondary">
              Ranking
            </Button>
            {!auth_user ? (
              <>
                <Button href="/login" size="small" color="secondary">로그인</Button>
                <Button href="/signup" size="small" color="secondary" sx={{boxShadow: 'none'}}>회원가입</Button>
              </>
            ) : (
              <>
                <Button color="secondary" size="small" onClick={handleLogout}>{auth_user?.username} 로그아웃</Button>
                <Button color="secondary" size="small" sx={{boxShadow: 'none'}} href="/">내 정보</Button>
              </>
            )}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}




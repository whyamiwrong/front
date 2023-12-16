"use client";
import React from "react";
import Link from "next/link";
import styled from "styled-components";
//import { useNavigate } from "react-router-dom";

import WhyWrongLogo from "../../public/img/Logo/WhyWrongLogo2.png"
import login from "../../public/img/Header/Login.png"
//import search from "../../assets/Icons/Header/search.svg";

const Icon = styled.img`
  cursor: pointer;
`;

const iconType = (navigate, type) => {
  const icon = {
    logo: (
      <Icon
        src={WhyWrongLogo}
        alt="logo"
        width="20%"
        onClick={() => {
            navigate("/page");
        }}
      />
    ),
    login: <Icon src={login} alt="login" onClick={() => navigate("/login")} />,
    search: (
      <Icon src={search} alt="search" onClick={() => navigate("/search")} />
    ),
  };

  return icon[type];
};

const HeaderWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ Color }) => Color || "white"};
`;

const IconsContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 10px;
  margin-top: 2px;
  margin-bottom: 2px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  & > :not(:last-child) {
    margin-right: 10px;
  }
`;

const EmptyIcon = styled.div`
  width: 16px;
  height: 16px;
`;

export default function Header({ left = "", right = [], bgColor }) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("Token");

  return (
    <>
      <HeaderWrapper Color={bgColor}>
        <IconsContainer>
          {left ? iconType(navigate, left) : <EmptyIcon />}
        </IconsContainer>
        <IconWrapper>
          {right.map((iconTypeItem) => {
            if (iconTypeItem === "login") {
              return isLoggedIn ? null : iconType(navigate, iconTypeItem);
            } else {
              return iconType(navigate, iconTypeItem);
            }
          })}
        </IconWrapper>
      </HeaderWrapper>
    </>
  );
}

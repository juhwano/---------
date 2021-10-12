import React from "react";
import styled from "styled-components";
import Responsive from "./Responsive";
import { Link } from "react-router-dom";
import MainLogo from "../../assets/logo/logo.png";
import ButtonComponent from "./ButtonComponent";
import SearchBox from "./search/SearchBox";
import ProfileAvatar from "../../assets/global/profile.png";

const NavbarWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #dbdbdb;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .left {
    display: flex;
    align-items: center;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

const StyledLogoWrapper = styled(Link)`
  display: inline-block;
  padding: 0.5rem;
  font-size: 1.25rem;
  line-height: inherit;
  white-space: nowrap;
`;

const StyledLogo = styled.img`
  display: inline;
  position: relative;
  height: 7rem;
`;

const Spacer = styled.div`
  height: 4rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #555555;
  font-size: 1.3rem;
  cursor: pointer;
  & + & {
    margin-left: 0.8rem;
  }
`;

const ProfileText = styled.div`
  text-decoration: none;
  color: #555555;
  font-size: 1.3rem;
`;

const ProfileWrap = styled.div`
  position: relative;
`;

const ProfileImageWrap = styled.div`
  width: 2.3rem;
  height: 2.3rem;
  margin-left: 1rem;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  height: 100%;
  min-width: 100%;
  left: 50%;
  position: relative;
  border-radius: 50%;
  transform: translateX(-50%);
`;

const ProfileBoard = styled.div`
  position: absolute;
  right: 0rem;
  bottom: -7.5rem;
  background-color: #ffffff;
  width: 10rem;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 4px 2px 4px rgba(0, 0, 0, 0.08);
`;

const ProfileItem = styled.div`
  padding: 1rem;
  font-size: 1.3rem;
  cursor: pointer;
  text-align: center;
  & + & {
    border-top: 1px solid rgba(0, 0, 0, 0.08);
  }
`;

function NavbarComponent({
  authInfo,
  onClickProfileImg,
  visible,
  onClickLogout,
}) {
  console.log("authInfo", authInfo);
  console.log("visible", visible);
  return (
    <>
      <NavbarWrap>
        <Wrapper>
          <div className="left">
            <StyledLogoWrapper to="/">
              <StyledLogo src={MainLogo} alt="logo" />
            </StyledLogoWrapper>
            {/* <SearchBox /> */}
          </div>
          {authInfo && authInfo.isLoggedIn ? (
            <div className="right">
              <ProfileText>
                <span style={{ fontWeight: "bolder" }}>
                  {authInfo.authInfo.nickName}
                </span>{" "}
                님 환영합니다
              </ProfileText>
              <ProfileWrap>
                <ProfileImageWrap onClick={onClickProfileImg}>
                  <ProfileImage src={ProfileAvatar} alt="profile-image" />
                </ProfileImageWrap>
                {visible && (
                  <ProfileBoard>
                    <ProfileItem>회원 정보 변경</ProfileItem>
                    <ProfileItem onClick={onClickLogout}>로그아웃</ProfileItem>
                  </ProfileBoard>
                )}
              </ProfileWrap>
            </div>
          ) : (
            <div className="right">
              <StyledLink to="/signin">로그인</StyledLink>
              <StyledLink to="/signup">회원가입</StyledLink>
            </div>
          )}
        </Wrapper>
      </NavbarWrap>
      <Spacer />
    </>
  );
}

export default NavbarComponent;

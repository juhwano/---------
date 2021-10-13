import React from "react";
import styled from "styled-components";
import Responsive from "./Responsive";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import MainLogo from "../../assets/logo/logo.png";
import ButtonComponent from "./ButtonComponent";
import SearchBox from "./search/SearchBox";
import ProfileAvatar from "../../assets/global/profile.png";
import {
  AiOutlineSearch,
  AiOutlineBell,
  AiOutlineComment,
  AiOutlineMenu,
} from "react-icons/ai";

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
  height: 5rem;
  z-index: 1;
`;

const Wrapper = styled(Responsive)`
  height: 5rem;
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
  padding-top: 0.2rem;
  font-size: 1.25rem;
  white-space: nowrap;
  height: 5.6rem;
`;

const StyledLogo = styled.img`
  display: inline;
  position: relative;
  height: 5.3rem;
  object-fit: cover;
`;

const Spacer = styled.div`
  height: 4rem;
`;

const StyledLinkButton = styled.button`
  display: inline-block;
  font-weight: 400;
  text-align: cetner;
  vertical-align: middle;
  line-height: 1.5;
  margin: 0.25rem;
  padding: 0.4375rem 0.4375rem;
  background-image: none;
  border: none;
  cursor: pointer;
  background-color: #fff;
  color: #000;
  font-size: 1.125rem;
  &:hover {
    border-color: #00b8ff;
    border-bottom: 1px solid #00b8ff;
  }
`;

const IconBlock = styled.div`
  display: flex;
  align-items: center;
  /* width: 100%; */
`;

const SearchBlock = styled.div`
  display: none;
  position: relative;
  margin-right: 1rem;
`;

const SearchWrapper = styled.div`
  border: 1px solid #000;
  padding: 0.2rem 0.5rem;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  width: 13rem;
  &:focus {
    outline: none;
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  & + & {
    margin-left: 0.5rem;
  }
`;

const SearchResultBlock = styled.div`
  width: 100%;
  height: 15rem;
  position: absolute;
  top: 3.5rem;
  box-shadow: 0 0.4rem 0.8rem 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #dedede;
  background: #fff;
`;

const SearchResultWrapper = styled.div`
  padding: 1rem;
  cursor: pointer;
  & + & {
    border-top: 1px solid #dedede;
  }
`;

const SearchResult = styled.div`
  font-size: 1.3rem;
  font-weight: normal;
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
  bottom: -8.5rem;
  background-color: #ffffff;
  width: 10rem;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 4px 2px 4px rgba(0, 0, 0, 0.08);
`;

const ProfileItem = styled.div`
  padding: 1rem;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  & + & {
    border-top: 1px solid rgba(0, 0, 0, 0.08);
  }
  &:hover {
    box-shadow: inset 0.475rem 0 #00b8ff;
  }
`;

const ProfileBtn = styled.button`
  cursor: pointer;
  border: none;
  background-color: #fff;
  font-size: 1rem;
  text-align: center;
`;

function NavbarComponent({
  authInfo,
  onClickProfileImg,
  visible,
  onClickLogout,
  onClickEditProfile,
}) {
  console.log("visible", visible);
  const history = useHistory();
  return (
    <>
      <NavbarWrap>
        <Wrapper>
          <div className="logoBlock">
            <StyledLogoWrapper to="/">
              <StyledLogo src={MainLogo} alt="logo" />
            </StyledLogoWrapper>
            {/* <SearchBox /> */}
          </div>
          {authInfo && authInfo.isLoggedIn ? (
            <IconBlock>
              <SearchBlock>
                <SearchWrapper>
                  <SearchInput type="text" name="search" />
                  <IconWrapper>
                    <AiOutlineSearch />
                  </IconWrapper>
                  <SearchResultBlock>
                    <SearchResultWrapper>
                      <SearchResult></SearchResult>
                    </SearchResultWrapper>
                  </SearchResultBlock>
                </SearchWrapper>
              </SearchBlock>
              <IconWrapper className="iconWrapper">
                <AiOutlineComment />
              </IconWrapper>
              <IconWrapper className="iconWrapper">
                <AiOutlineBell />
              </IconWrapper>
              <ProfileWrap>
                <ProfileImageWrap onClick={onClickProfileImg}>
                  <ProfileImage src={ProfileAvatar} alt="profile-image" />
                </ProfileImageWrap>
                {visible && (
                  <ProfileBoard>
                    <ProfileItem onClick={onClickEditProfile}>
                      회원 정보 변경
                    </ProfileItem>
                    <ProfileItem onClick={onClickLogout}>로그아웃</ProfileItem>
                  </ProfileBoard>
                )}
              </ProfileWrap>
            </IconBlock>
          ) : (
            <div className="right">
              <Link to="/signin">
                <StyledLinkButton>로그인</StyledLinkButton>
              </Link>
              <Link to="/signup">
                <StyledLinkButton>회원가입</StyledLinkButton>
              </Link>
            </div>
          )}
        </Wrapper>
      </NavbarWrap>
      <Spacer />
    </>
  );
}

export default NavbarComponent;

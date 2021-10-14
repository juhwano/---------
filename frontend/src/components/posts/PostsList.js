import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Responsive from "../common/Responsive";
import DefaultAvatar from "../../assets/global/profile.png";
import palette from "../../libs/styles/palette";
import { useHistory } from "react-router-dom";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import Comment from "../common/comment/Comment";
import dayjs from "dayjs";
dayjs.locale("ko");

const PostsListBlock = styled(Responsive)`
  margin-top: 3rem;
  margin-bottom: 4rem;
`;

const PostsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostItemBlock = styled.div`
  padding: 1rem 1rem;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  max-width: 40rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
  }

  & + & {
    margin-top: 2rem;
  }
`;

const ProfileWrap = styled.div`
  display: flex;
`;

const ProfileImageWrap = styled.div`
  width: 3rem;
  height: 3rem;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  height: 100%;
  min-width: 100%;
  left: 50%;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  border-radius: 50%;
  transform: translateX(-50%);
`;
const PostItemInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 0.7rem;
`;

const PostItemDate = styled.div`
  font-size: 1.1rem;
  color: grey;
  margin-top: 0.3rem;
`;

const ProfileInfoWrap = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  .nickName {
    font-weight: bold;
    margin-right: 0.7rem;
  }
  .profile {
    color: grey;
  }
  .dot {
    margin: 0 0.2rem;
  }
`;

const StyledMaleIcon = styled(BsGenderMale)`
  font-weight: bolder;
  vertical-align: bottom;
  color: blue;
  stroke: blue;
  stroke-width: 0.7px;
`;
const StyledFemaleIcon = styled(BsGenderFemale)`
  font-weight: bolder;
  vertical-align: bottom;
  color: red;
  stroke: red;
  stroke-width: 0.7px;
`;

const PostContentWrap = styled.div`
  margin-top: 2rem;
`;

const PostCategory = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: grey;
`;

const PostTitle = styled.div`
  font-size: 1.3rem;
  font-weight: bolder;
`;

const PostContent = styled.div`
  font-size: 1.3rem;
  margin-top: 2rem;
`;

const PostTags = styled.div`
  display: flex;
  margin-top: 2rem;
`;

const PostTagsItem = styled.div`
  font-size: 1.2rem;
  color: grey;
  & + & {
    margin-left: 0.1rem;
  }
`;

function PostItem({ post, gender, onClickPost }) {
  console.log("post null처리", post);
  console.log("사람", post.writer);
  console.log("post.tags", post.tags);
  // let inoDay = dayjs(post.writer.inoDate); // 접종날짜

  return (
    <PostItemBlock onClick={onClickPost}>
      <ProfileWrap>
        <ProfileImageWrap>
          {post.writer && post.writer.profileImage !== null ? (
            <ProfileImage src={post.writer.profileImage} />
          ) : (
            <ProfileImage src={DefaultAvatar} />
          )}
        </ProfileImageWrap>
        <PostItemInfoWrap>
          <ProfileInfoWrap>
            <span className="nickName">
              {post.writer && post.writer.nickName}
              {post.writer && post.writer.gender === "male" ? (
                <StyledMaleIcon />
              ) : (
                <StyledFemaleIcon />
              )}
            </span>
            <span className="profile">{post.writer && post.writer.type}</span>
            <span className="dot">·</span>
            <span className="profile">{post.writer && post.writer.degree}</span>
            <span className="dot">·</span>
            <span className="profile">{post.writer && post.writer.age}</span>
          </ProfileInfoWrap>
          {/* 시간 남으면 1분전, 2시간전... 등 같이 만들어보기 */}
          <PostItemDate>{post.writer && post.writer.inoDate}</PostItemDate>
        </PostItemInfoWrap>
      </ProfileWrap>
      <PostContentWrap>
        <PostCategory>{post && post.category}</PostCategory>
        <PostTitle>{post && post.title}</PostTitle>
        {post && (
          <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />
        )}
        <PostTags>
          {/* 조건 렌더링 연속 */}
          {post &&
            post.tags &&
            post.tags.map((item) => <PostTagsItem>{`#${item}`}</PostTagsItem>)}
        </PostTags>
      </PostContentWrap>
    </PostItemBlock>
  );
}

function PostsList({ posts }) {
  const history = useHistory();

  return (
    <PostsListBlock>
      <PostsListContainer>
        {posts &&
          posts.map((post, index) => {
            return (
              <PostItem
                key={index}
                onClickPost={() => history.push(`/post/${post._id}`)}
                post={post}
              />
            );
          })}
      </PostsListContainer>
    </PostsListBlock>
  );
}

export default PostsList;

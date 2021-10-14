import React from "react";
import styled from "styled-components";
import Responsive from "../../common/Responsive";
import BoldLabel from "../../common/text/BoldLabel";
import EditAvatar from "../../common/avatar/EditAvatar";
import DropDown from "../../common/dropdown/DropDown";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const EditProfileWrap = styled(Responsive)``;

const EditLabelWrap = styled.div`
  margin-bottom: 2rem;
`;

const EditItemBlock = styled.div`
  & + & {
    margin-top: 2rem;
  }
`;

const StyledDropDown = styled(DropDown)`
  width: 20rem;
  .DropDown_Control {
    font-size: 1.3rem !important;
  }
  .DropDown_Menu {
    font-size: 1.3rem !important;
  }
  .DropDown_Arrow {
    top: 11px !important;
  }
`;

const EditInput = styled.input`
  width: 20rem;
  box-sizing: border-box;
  font-size: 1.3rem;
  border: 1px solid #ccc;
  padding: 0.8rem 1rem;
  &:focus {
    outline: none;
  }
`;

function EditProfile({
  onClickAvatar,
  profileImg,
  onChangeDropDown,
  onChangeCalender,
}) {
  const ageOptions = [
    { value: "영유아", label: "영유아", key: "age" },
    { value: "10", label: "10대", key: "age" },
    { value: "20", label: "20대", key: "age" },
    { value: "30", label: "30대", key: "age" },
    { value: "40", label: "40대", key: "age" },
    { value: "50", label: "50대", key: "age" },
    { value: "60", label: "60대", key: "age" },
    { value: "70", label: "70대", key: "age" },
    { value: "80", label: "80대", key: "age" },
    { value: "90", label: "90대", key: "age" },
  ];

  const genderOptions = [
    { value: "male", label: "남자", key: "gender" },
    { value: "female", label: "여자", key: "gender" },
  ];

  const vaccineOptions = [
    { value: "MD", label: "모더나", key: "type" },
    { value: "PF", label: "화이자", key: "type" },
    { value: "AZ", label: "아스트라제네카", key: "type" },
    { value: "JS", label: "얀센", key: "type" },
    { value: "ETC", label: "기타", key: "type" },
  ];

  const degreeOptions = [
    { value: 0, label: "접종 안함", key: "degree" },
    { value: 1, label: "1차", key: "degree" },
    { value: 2, label: "2차", key: "degree" },
  ];
  return (
    <EditProfileWrap>
      <EditItemBlock>
        <EditLabelWrap>
          <BoldLabel>프로필 이미지 선택</BoldLabel>
        </EditLabelWrap>
        <EditAvatar
          imgURL={profileImg.imgBase64}
          onClickAvatar={onClickAvatar}
        />
      </EditItemBlock>
      <EditItemBlock>
        <EditLabelWrap>
          <BoldLabel>나이 선택</BoldLabel>
        </EditLabelWrap>
        <StyledDropDown
          onChangeDropDown={onChangeDropDown}
          options={ageOptions}
          myPlaceholder={"나이를 선택 해주세요."}
        />
      </EditItemBlock>
      <EditItemBlock>
        <EditLabelWrap>
          <BoldLabel>성별 선택</BoldLabel>
        </EditLabelWrap>
        <StyledDropDown
          onChangeDropDown={onChangeDropDown}
          options={genderOptions}
          myPlaceholder={"성별을 선택 해주세요."}
        />
      </EditItemBlock>
      <EditItemBlock>
        <EditLabelWrap>
          <BoldLabel>백신 선택</BoldLabel>
        </EditLabelWrap>
        <StyledDropDown
          options={vaccineOptions}
          onChangeDropDown={onChangeDropDown}
          myPlaceholder={"백신을 선택 해주세요."}
        />
      </EditItemBlock>
      <EditItemBlock>
        <EditLabelWrap>
          <BoldLabel>차수 선택</BoldLabel>
        </EditLabelWrap>
        <StyledDropDown
          options={degreeOptions}
          onChangeDropDown={onChangeDropDown}
          myPlaceholder={"차수를 선택 해주세요."}
        />
      </EditItemBlock>
      <EditItemBlock>
        <EditLabelWrap>
          <BoldLabel>백신 접종 날짜 선택</BoldLabel>
        </EditLabelWrap>
        <Calendar onChange={onChangeCalender} value={new Date()} />
      </EditItemBlock>
    </EditProfileWrap>
  );
}

export default EditProfile;

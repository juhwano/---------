import React, { useContext } from "react";
import { useState } from "react";
import EditProfile from "../../../components/auth/profile/EditProfile";
import ProfileContext from "../../../context/ProfileContext";

function EditProfileContainer() {
  const { profileInfo, setProfileInfo } = useContext(ProfileContext);

  const [profileImg, setProfileImg] = useState({
    imgBase64: "",
    imgFile: null,
    imgURL: "",
  });

  // const [profileInfo, setProfileInfo] = useState({
  //   age: 0,
  // gender: "",
  // type: "",
  // degree: 0,
  // imgURL: "",
  // inoDate: null,
  // });

  const onClickAvatar = (e) => {
    const imageFile = e.target.files[0];
    console.log("imageFile", imageFile);
    const imgBase64 = URL.createObjectURL(imageFile);
    setProfileImg({
      ...profileImg,
      imgBase64: imgBase64,
      imgFile: imageFile,
    });
  };

  const onChangeDropDown = (payload) => {
    console.log(payload);
  };

  const onChangeCalender = (date) => {
    console.log(date);
  };

  const onChangeAge = (e) => {
    console.log(e);
    const value = e.target.value;
    console.log("age값", value);
    setProfileInfo({
      ...profileInfo,
      age: value,
    });
  };
  return (
    <EditProfile
      onChangeDropDown={onChangeDropDown}
      profileImg={profileImg}
      onClickAvatar={onClickAvatar}
      onChangeCalender={onChangeCalender}
      onChangeAge={onChangeAge}
    />
  );
}

export default EditProfileContainer;

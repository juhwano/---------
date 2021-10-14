import React, { useContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import EditProfile from "../../../components/auth/profile/EditProfile";
import ProfileContext from "../../../context/ProfileContext";
import client from "../../../libs/api/_client";

function EditProfileContainer() {
  const { profileInfo, setProfileInfo } = useContext(ProfileContext);
  // 이미지 파일 상태관리
  const [profileImg, setProfileImg] = useState({
    imgBase64: "",
    imgFile: null,
  });
  // 유저 정보 상태관리
  // const [profileInfo, setProfileInfo] = useState({
  //   age: "0",
  // gender: "",
  // type: "",
  // degree: 0,
  // imgURL: "",
  // inoDate: null,
  // });

  const onClickAvatar = async (e) => {
    const imageFile = e.target.files[0];
    console.log("imageFile", imageFile);
    //file 배열 넣으면 url로 반납
    const imgBase64 = URL.createObjectURL(imageFile);
    setProfileImg({
      ...profileImg,
      imgBase64: imgBase64,
      imgFile: imageFile,
    });
    // 서버에 보내기 전 폼데이터 객체 생성
    const formData = new FormData();
    formData.append("img", imageFile);

    try {
      const response = await client.post("/auth/image", formData, {
        "Content-Type": "multipart/form-data",
      });
      console.log(response);
      //에러 핸들링
      if (response.status === 200) {
        toast.dark("업로드 완료 !");
        const imgURL = response.data.imgUrl;
        setProfileInfo({
          imgURL,
        });
      }
    } catch (error) {
      console.error(error);
    }

    console.log("profileInfo", profileInfo);
  };

  const onChangeDropDown = (payload) => {
    const { key, value } = payload;
    console.log("key", key);

    setProfileInfo({
      ...profileInfo,
      [key]: value,
    });
    console.log("profileInfo", profileInfo);
  };

  const onChangeCalender = (date) => {
    console.log(date);
    setProfileInfo({
      ...profileInfo,
      inoDate: date,
    });
    console.log("profileInfo", profileInfo);
  };

  // const onChangeAge = (e) => {
  //   const ageValue = e.target.value;
  //   setProfileInfo({
  //     ...profileInfo,
  //     age: ageValue,
  //   });
  //   console.log("profileInfo", profileInfo);
  // };
  return (
    <EditProfile
      onChangeDropDown={onChangeDropDown}
      profileImg={profileImg}
      onClickAvatar={onClickAvatar}
      onChangeCalender={onChangeCalender}
    />
  );
}

export default EditProfileContainer;

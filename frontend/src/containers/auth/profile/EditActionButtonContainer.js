import React, { useContext } from "react";
import { useHistory } from "react-router";
import EditActionButtons from "../../../components/auth/profile/EditActionButtons";
import { toast } from "react-toastify";
import client from "../../../libs/api/_client";
import ProfileContext from "../../../context/ProfileContext";
function EditActionButtonContainer() {
  const history = useHistory();
  const { profileInfo } = useContext(ProfileContext);
  // const { profileImg } = useContext(ImageContext);
  // console.log("이미지", profileImg);

  // 유저 정보 상태관리
  // const [profileInfo, setProfileInfo] = useState({
  //   age: "0",
  // gender: "",
  // type: "",
  // degree: 0,
  // imgURL: "",
  // inoDate: null,
  // });

  const onEdit = async () => {
    // // 정보 업로드
    try {
      const response = await client.put("/auth/profile", profileInfo);
      console.log(response);
      //에러 핸들링
      if (response.status === 200) {
        console.log("회원 정보 수정 성공");
        toast.dark("🚀회원 정보 수정 완료 !");
        history.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onCancel = () => {
    toast.dark("회원 정보 수정 취소");
    history.push("/");
  };

  return <EditActionButtons onEdit={onEdit} onCancel={onCancel} />;
}

export default EditActionButtonContainer;

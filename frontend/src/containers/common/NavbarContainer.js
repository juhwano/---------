import React, { useCallback, useState } from "react";
import { useContext } from "react";
import { useHistory } from "react-router";
import { ToastsStore } from "react-toasts";
import NavbarComponent from "../../components/common/NavbarComponent";
import AuthContext from "../../context/AuthContext";

function NavbarContainer() {
  const history = useHistory();
  // useContext로 authInfo 받아와서 props로 활용
  const { authInfo, setAuthInfo } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  const onClickProfileImg = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const onClickLogout = () => {
    localStorage.removeItem("accessToken");
    setAuthInfo({ isLoggedIn: false, userInfo: {} });
    ToastsStore.success("로그아웃 완료");
    history.push("/");
  };
  return (
    <NavbarComponent
      authInfo={authInfo}
      visible={visible}
      onClickLogout={onClickLogout}
      onClickProfileImg={onClickProfileImg}
    />
  );
}

export default NavbarContainer;

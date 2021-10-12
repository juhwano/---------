import { useState } from "react";
import AuthContext from "../AuthContext";

const AuthProvider = ({ children }) => {
  // 상태관리를 위한 useState
  const [authInfo, setAuthInfo] = useState({
    isLoggedIn: false,
    userInfo: {},
  });
  //value로 authInfo와 setAuthInfo를 형태로 넘겨줌
  // AuthContext를 감싸고 children안의 모든 코드들은
  // useContext로 전역으로 해당 value값들을 받을 수 있다.
  return (
    <AuthContext.Provider
      value={{
        authInfo,
        setAuthInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

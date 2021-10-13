import React from "react";
import { Link } from "react-router-dom";

export default function Error({ location }) {
  return (
    <div className="회원가입박스">
      <div>
        <img
          src="https://careerly.co.kr/_next/static/images/img_emoji_raising-hands-6b2cd5fa662a09f7100de60b79292c89.png"
          alt="sorry"
        />
      </div>
      <div>
        <br />
        <p>
          죄송합니다. <br /> 요청하신 페이지 ({location.pathname}) 를 찾을 수
          없습니다.
        </p>
        <br />
        <p>
          찾으시려는 페이지의 주소가 잘못 입력되었거나, <br />
          페이지 주소가 변경 또는 삭제되어 요청하신 페이지를 찾을 수 없습니다.
          <br />
          <br />
          입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주시길
          부탁드립니다.
        </p>
      </div>
      <br />
      <div>
        <Link to="/">홈으로 가기</Link>
      </div>
    </div>
  );
}

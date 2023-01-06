import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();
  const user = {
    email: "",
    password1: "",
    password2: "",
  };

  const [userInfo, setUserInfo] = useState(user);
  const [btn, setBtn] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    const { email, password1, password2 } = userInfo;
    if (
      email.includes(".") &&
      email.includes("@") &&
      password1.length >= 8 &&
      password2.length >= 8
    ) {
      setBtn(true);
    } else {
      setBtn(false);
    }
  }, [userInfo]);

  const signUp = () => {
    if (userInfo.password1 !== userInfo.password2) {
      alert("비밀번호와 비밀번호 확인의 값이 다릅니다.");
      passwordRef.current.focus();
      return;
    }
    fetch("http://localhost:8080/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userInfo.email,
        password: userInfo.password1,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.details) {
          alert(data.details);
        } else {
          alert(data.message);
          localStorage.setItem("userToken", data.token);
          navigate("/", { replace: true });
        }
      });
  };

  return (
    <div>
      <input
        ref={emailRef}
        value={userInfo.email}
        placeholder="이메일"
        type="email"
        name="email"
        id="email"
        onChange={(e) => {
          setUserInfo({ ...userInfo, email: e.target.value });
        }}
      />
      <p>example@example.xxx 형식으로 입력해주세요.</p>
      <input
        ref={passwordRef}
        placeholder="비밀번호"
        type="password"
        name="password1"
        id="password1"
        onChange={(e) => {
          setUserInfo({ ...userInfo, password1: e.target.value });
        }}
      />
      <p>8자리 이상으로 입력해주세요.</p>
      <input
        placeholder="비밀번호 확인"
        type="password"
        name="password2"
        id="password2"
        onChange={(e) => {
          setUserInfo({ ...userInfo, password2: e.target.value });
        }}
      />
      <br />
      {btn ? <button onClick={signUp}>회원가입</button> : ""}
    </div>
  );
};

export default SignUpForm;

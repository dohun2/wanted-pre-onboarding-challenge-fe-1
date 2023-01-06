import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const user = {
    email: "",
    password: "",
  };

  const [userInfo, setUserInfo] = useState(user);
  const [btn, setBtn] = useState(false);

  useEffect(() => {
    const { email, password } = userInfo;
    if (email.includes(".") && email.includes("@") && password.length >= 8) {
      setBtn(true);
    } else {
      setBtn(false);
    }
  }, [userInfo]);

  const login = () => {
    fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userInfo.email,
        password: userInfo.password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.details) {
          alert(data.details);
          emailRef.current.focus();
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
        onChange={(e) => {
          setUserInfo({ ...userInfo, email: e.target.value });
        }}
        placeholder="이메일"
        type="email"
        name="email"
        id="email"
      />
      <br />
      <input
        value={userInfo.password}
        onChange={(e) => {
          setUserInfo({ ...userInfo, password: e.target.value });
        }}
        placeholder="비밀번호"
        type="password"
        name="password"
        id="password"
      />
      <br />
      {btn ? <button onClick={login}>로그인</button> : ""}
    </div>
  );
};

export default LoginForm;

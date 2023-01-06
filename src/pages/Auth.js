import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const Auth = () => {
  const [AuthToggle, setAuthToggle] = useState("Login");
  const onLogin = () => setAuthToggle("Login");
  const onSignUp = () => setAuthToggle("SignUp");
  return (
    <div className="Auth">
      <h1>로그인, 회원가입 페이지</h1>
      <div className="AuthForm">
        <div className="AuthToggle">
          <div onClick={onLogin}>로그인</div>
          <div onClick={onSignUp}>회원가입</div>
        </div>
        {AuthToggle === "Login" ? <LoginForm /> : <SignUpForm />}
      </div>
    </div>
  );
};

export default Auth;

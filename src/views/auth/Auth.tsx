import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";
import Login from "../../components/login/Login";
import Register from "../../components/register/Register";
import "./Auth.scss";
import { useEffect } from "react";

interface AuthPropsI {
}

export default function Auth({ }: AuthPropsI) {
  const navigate = useNavigate();
  const {state} = useAppContext();
  const pathname = window.location.pathname;

  useEffect(() => {
    if (state.user)
      navigate("/");
  }, [state.user]);

  const getFormData = (elements: any) => {
    const data:{[k:string]: any} = {};
    for (const e of elements) {
      if (!e.name) continue;
      data[e.name] = e.value;
    }
    return data;
  }
  
  return (
    <div className="auth">
      <img src="/logo-full.svg" alt="Logo" />
      <div className="ah-content">
        <h1>Wellcome</h1>
        {pathname === "/login"? 
          <>
            <Login formId="authForm" getFormData={getFormData} navigate={navigate} />
            <Link to="/register">Don't have an account? register here</Link>
          </>:
          <>
            <Register formId="authForm" getFormData={getFormData} navigate={navigate} />
            <Link to="/login">Already have an account? login here</Link>
          </>
        }
      </div>
    </div>
  );
}

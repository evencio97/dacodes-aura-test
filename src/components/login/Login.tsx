import { Button, TextField } from "@mui/material";
import { NavigateFunction } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";
import "./Login.scss";
import users from "../../users.json";


interface LoginPropsI {
  formId: string, getFormData: (e: any) => {[k: string]: any},
  navigate: NavigateFunction
}

export default function Login({formId, getFormData, navigate}: LoginPropsI) {
  const { setUser } = useAppContext();

  const handlerSubmit = (event: any) => {
    event.preventDefault();
    const data: any = getFormData(event.target);
    // Check by email
    const user = users.find(e => e.email===data.email);
    if (!user)
      return alert("Invalid email");
    if (user.password !== data.password)
      return alert("Invalid password");
    // Login
    setUser(data);
    navigate("/");
  };

  return (
    <form id={formId} onSubmit={handlerSubmit} >
      <div className="form-field">
        <span>Email</span>
        <TextField name="email" type="email" placeholder="Email" required />
      </div>
      <div className="form-field">
        <span>Password</span>
        <TextField type="password" name="password" placeholder="Password" required />
      </div>
      <Button variant="contained" type="submit">
        Continue
      </Button>
    </form>
  );
}

import { Button, TextField } from "@mui/material";
import { NavigateFunction } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";
import "./Register.scss";

interface RegisterPropsI {
  formId: string, getFormData: (e: any) => {[k: string]: any},
  navigate: NavigateFunction
}

export default function Register({formId, navigate, getFormData}: RegisterPropsI) {
  const { setUser } = useAppContext();

  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: any = getFormData(event.target);
    if (data.password !== data.confirmedPassword)
      return alert("The passwords should match");
    
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
      <div className="form-field">
        <span>Confirm Password</span>
        <TextField type="password" name="confirmedPassword" placeholder="Password" required />
      </div>
      <Button variant="contained" type="submit">
        Continue
      </Button>
    </form>
  );
}
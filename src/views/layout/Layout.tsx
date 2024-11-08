import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAppContext';
import Sidebar from '../../components/sidebar/Sidebar';
import "./Layout.scss";

export default function Layout({ }) {
  const navigate = useNavigate();
  const {state} = useAppContext();

  useEffect(() => {
    if (!state.user)
      navigate("/login");
  }, [state.user]);

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

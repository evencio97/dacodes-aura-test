import "./Sidebar.scss";
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";

interface MenuLinkI {
  img: string, url: string
}

export default function Sidebar({}) {
  const {setUser} = useAppContext();

  const menu = {
    upper: [
      {img: "/image-icon.svg", url: ""},
      {img: "/image-icon.svg", url: ""},
      {img: "/image-icon.svg", url: ""}
    ],
    lower: [
      {img: "/image-icon.svg", url: ""},
      {img: "/image-icon.svg", url: ""},
      {img: "/image-icon.svg", url: ""}
    ]
  };

  const mapLinks = (links: MenuLinkI[]) => links.map((e, i) => (
    <Link key={i} to={e.url}>
      <img src={e.img} alt="Menu option" />
    </Link>
  )); 

  return (
    <div className="sidebar">
      <div className="sb-logo">
        <Link to="/">
          <img src="/logo.svg" alt="Logo" />
        </Link>
      </div>
      <div className="sb-menu">
        <div>
          {mapLinks(menu.upper)}
        </div>
        <div>
          {mapLinks(menu.lower)}
          <IconButton onClick={() => setUser(undefined)}>
            <MeetingRoomOutlinedIcon/>
          </IconButton>
        </div>
      </div>
    </div>
  );
}

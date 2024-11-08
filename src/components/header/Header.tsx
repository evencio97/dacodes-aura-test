import { useNavigate } from "react-router-dom";
import "./Header.scss";

interface HeaderButtonI {
  img: string, text: string, url?: string, onClick?: any
}

interface HeaderPropsI {
  handlerUploadData: () => void
}

export default function Header({ handlerUploadData }:HeaderPropsI) {
  const navigate = useNavigate();
  
  const navigateToLink = (url: string) => (() => navigate(url));
  
  const mapButton = (btn: HeaderButtonI, i: number) => (
    <div key={i} onClick={btn.onClick? btn.onClick: (btn.url? navigateToLink(btn.url): undefined)}>
      <img src={btn.img} alt={btn.text} />
      <span>{btn.text}</span>
    </div>
  )
  
  const buttons: HeaderButtonI[] = [
    { img: "/documents-amico.svg", text: "Search Data", url: "/search" },
    { img: "/file-bundle-amico.svg", text: "Upload your Data", onClick: handlerUploadData },
    { img: "/artificial-intelligence-amico.svg", text: "Try our AI Tool", url: "/chat" }
  ]

  return (
    <div className="header">
      <h1>Aura</h1>
      <h2>Augmented Universal Research Assistant</h2>
      <h3>Your in one single intuitive platform along side with your team.</h3>
      <div className="hd-buttons">
        {
          buttons.map(mapButton)
        }
      </div>
    </div>
  );
}

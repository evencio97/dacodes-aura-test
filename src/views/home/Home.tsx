import { Component } from 'react';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { Link } from 'react-router-dom';
import "./Home.scss";

export default class Home extends Component {
  list = [
    "Save companies of your interest and see new entries",
    "Use our AI tool to summarize interviews",
    "Get exclusive data",
    "Common questions",
    "Make reports"
  ]

  mapList() {
    return this.list.map((e, i) => (
      <p className="wm-list-item" key={i}>
        <CheckRoundedIcon /> {e}
      </p>
    ));
  }

  render() {
    return (
      <div className="home container">
        <div className="wm-text content-column">
          {/* TODO: Change to user name */}
          <p className="wm-title">Wellcome John!</p>
          <p className="wm-subtitle">We are so glad to have in Aura.</p>
          <p>We have 500+ companies with interviews and data for your investment analysis and research.</p>
          <div className="wm-list">
            <p className="wm-list-text">You will be able to:</p>
            {this.mapList()}
          </div>
          <Link className="custom-btn" to="/search">Let's begin!</Link>
        </div>
        <div className="wm-img img-column">
          <img src="/personal-goals-amico.png" alt="home" />
        </div>
      </div>
    );
  }
}

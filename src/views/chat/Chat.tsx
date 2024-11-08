import { Component } from 'react';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { Link } from 'react-router-dom';
import { IconButton, TextField } from '@mui/material';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import chatSevice from '../../services/chatSevice';
import "./Chat.scss";


interface ChatStateI {
  response?: string, question?: string, loading: boolean
}

export default class Chat extends Component {
  state: ChatStateI = {
    response: undefined,
    question: undefined,
    loading: false
  };

  resetForm() {
    (document.getElementById("chat-input-form") as (HTMLElement & { reset: () => void }) | null)?.reset();
  }

  async getResponse(query: string) {
    this.setState({ loading: true });
    try {
      this.setState({ response: await chatSevice.getResponse(query) });
      this.resetForm();
    } catch (error) {
      console.error(error);
    }
    this.setState({ loading: false });
  }

  handlerSubmit(event: any) {
    event.preventDefault();
    const question = event?.target?.[0]?.value;
    if (!question) return;

    this.setState({ question: question });
    this.getResponse(question);
  };

  render() {

    return (
      <div className="chat">
        <Link className="ct-return" to="/"><ArrowBackIosNewRoundedIcon />Return</Link>
        <div className="ct-header">
          <h1>Aura Ai</h1>
        </div>
        <div className="ct-content">
          {this.state.question? <p className="ct-question">{this.state.question}</p>:null}
          {this.state.response?
            (<div className="ct-response">
              <p>{this.state.response}</p>
              <div className="ct-response-ops">
                <IconButton><CachedRoundedIcon /></IconButton>
                <IconButton><StarBorderRoundedIcon /></IconButton>
                <IconButton><DescriptionRoundedIcon /></IconButton>
                <IconButton><InsertDriveFileRoundedIcon /></IconButton>
                <IconButton><ThumbUpAltOutlinedIcon /></IconButton>
                <IconButton><ThumbDownOutlinedIcon /></IconButton>
                <IconButton><MoreVertRoundedIcon /></IconButton>
              </div>
            </div>):null
          }
        </div>
        <div className="ct-input">
          <form id="chat-input-form" onSubmit={(e) => this.handlerSubmit(e)} >
            <TextField
              className="ct-input-field" name="query"
              placeholder="Hi, I’m Aura, you AI Assistant. Tell me, what question do you have?"
            />
            <IconButton className="ct-submit-btn" type="submit" aria-label="send">
              <SendRoundedIcon />
            </IconButton>
          </form>
        </div>
        <LoadingSpinner active={this.state.loading}/>
      </div>
    );
  }
}

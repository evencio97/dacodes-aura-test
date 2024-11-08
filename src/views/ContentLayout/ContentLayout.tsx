import { Component } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';
import UploadData from '../../components/uploadData/UploadData';
import "./ContentLayout.scss";

export default class ContentLayout extends Component {
  state: Readonly<{open: boolean}> = {
    open: false
  };

  openUploadData() {
    this.setState({ open: true });
  }

  closeUploadData() {
    this.setState({ open: false });
  }
  
  render() {
    return (
      <>
        <Header handlerUploadData={() => this.openUploadData()} />
        <Outlet />
        <UploadData open={this.state.open} handlerClose={() => this.closeUploadData()} />
      </>
    );
  }
}

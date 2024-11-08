import { Component } from 'react';
import { IconButton } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CompanySearch from '../../components/companySearch/CompanySearch';
import { CompanyI, FMPCompanyInfoI } from '../../interfaces/company';
import CompanyInfo from '../../components/companyInfo/CompanyInfo';
import "./Search.scss";

interface StateI {
  savedCompanies: {[k: string]: boolean},
  savedCompaniesCount: number,
  company: FMPCompanyInfoI | null
}

export default class Search extends Component {
  mainCompanies: CompanyI[] = [
    {symbol: "AMZN", name: "Amazon"},
    {symbol: "MSFT", name: "Microsoft"},
    {symbol: "ESTC", name: "Elastic"},
    {symbol: "U", name: "Unity Software"},
    {symbol: "CVNA", name: "Carvana Co"},
    {symbol: "EPAM", name: "EPAM Systems"},
    {symbol: "WBD", name: "Warner Bros"}
  ]

  state: StateI = {
    savedCompanies: {},
    savedCompaniesCount: 0,
    company: null
  };

  toggleFavorites(e: CompanyI) {
    const value = !this.state.savedCompanies?.[e.symbol];

    this.setState({
      savedCompanies: {...this.state.savedCompanies, [e.symbol]: value},
      savedCompaniesCount: this.state.savedCompaniesCount + (value? 1:-1)
    });
  }

  mapMainCompanies() {
    return this.mainCompanies.map((e, i) => (
      <p key={i}>
        <span>{e.symbol}</span> {e.name}
        <IconButton aria-label="toggle" onClick={() => this.toggleFavorites(e)}>
          {this.state.savedCompanies[e.symbol]? <CheckRoundedIcon />:<AddRoundedIcon />}
        </IconButton>
      </p>
    ))
  }

  setSelectedCompany(data: FMPCompanyInfoI | null = null) {
    this.setState({company: data});
  }
  
  render() {

    return (
      <div className="search container">
        <div className="sh-content content-column">
          <p className="sh-title">5,000+ companies with data and insight for you</p>
          <p>Find the company you are interested in. This will help us customize your experience.</p>
          <CompanySearch setSelectedCompany={(data) => this.setSelectedCompany(data)} />
          <div className="sh-main-companies">
            <div>
              {this.mapMainCompanies()}
            </div>
            <span>{this.state.savedCompaniesCount} Companies saved</span>
          </div>
        </div>
        <div className="img-column">
          <img src="/site-stats-amico.png" alt="home" />
        </div>
        {this.state.company? <CompanyInfo data={this.state.company} open={true} handlerClose={() => this.setSelectedCompany()} />:null}
      </div>
    );
  }
}

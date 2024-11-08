export interface CompanyI {
  symbol: string, name: string 
}

export interface FMPCompanyI {
  symbol: string, name: string 
  currency: string, stockExchange: string,
  exchangeShortName: string
}

export interface FMPCompanyInfoI {
  symbol: string, name: string 
  price: number, companyName: string,
  currency: string, exchange: string,
  industry: string, website: string,
  description: string, ceo: string,
  country: string, address: string,
  city: string, state: string,
  zip: string, image: string
}
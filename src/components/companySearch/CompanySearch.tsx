import React from "react";
import { Autocomplete, Box, CircularProgress, TextField } from "@mui/material";
import "./CompanySearch.scss";
import { FMPCompanyI, FMPCompanyInfoI } from "../../interfaces/company";
import fmpSevice from "../../services/fmpSevice";

interface CompanySearchPropsI {
  setSelectedCompany: (data: FMPCompanyInfoI | null) => void
}

export default function CompanySearch({ setSelectedCompany }: CompanySearchPropsI) {
  const [options, setOptions] = React.useState<FMPCompanyI[]>([]);
  const [loading, setLoading] = React.useState(false);

  const cleanOptions = () => {
    setOptions([]);
    setLoading(false);
  }
  // @ts-ignore
  const handleCompanySelected = async (event: any, value: any) => {
    if (!value?.symbol) 
      return cleanOptions();
    
    // console.log("Selected", value.symbol, value.name);
    try {
      setSelectedCompany(await fmpSevice.getCompanyInfo(value.symbol));
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnChange = async (event: any) => {
    const value: string = event?.target?.value?.trim();
    // console.log("handleOnChange", value);
    if (!value?.length) 
      return cleanOptions();
    
    setLoading(true);
    let companies:FMPCompanyI[] = [];
    try {
      companies = await fmpSevice.searchCompanies(value);
    } catch (error) {
      console.error(error);
      // TODO: Handler error for USER
    }
    setLoading(false);
    setOptions(companies);
  };
  
  return (
    <Autocomplete
      id="search-company"
      freeSolo
      loading={loading}
      onChange={handleCompanySelected}
      options={options}
      // @ts-ignore
      filterOptions={(options, params) => options}
      getOptionLabel={(option: any) => option.name}
      renderOption={(props, option: FMPCompanyI) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={option.symbol}
            component="li"
            sx={{fontFamily: '"Sansation", sans-serif', '& > span': {fontWeight: "bold", marginRight: "5px"}}}
            {...optionProps}
          >
            <span>{option.symbol}</span> {option.name}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} label="Search company"
          onChange={handleOnChange}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
          }}
        />
      )}
    />
  );
}

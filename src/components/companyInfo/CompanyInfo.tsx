import { FMPCompanyInfoI } from "../../interfaces/company";
import CustomModal from "../CustomModal/CustomModal";
import "./CompanyInfo.scss";

interface CompanyInfoPropsI {
  data: FMPCompanyInfoI, open: boolean,
  handlerClose: () => void
}

export default function CompanyInfo({ data, open, handlerClose }: CompanyInfoPropsI) {
  
  return (
    <CustomModal
      id="company-info-modal"
      open={open}
      handlerClose={handlerClose}
    >
      <>
        {data.image? <img src={data.image} alt={data.companyName} /> : null}
        <p className="company-name">
          <a target="_blank" rel="noopener noreferrer" href={data.website} >{data.companyName}</a>
        </p>
        <p><span>Industry:</span>{data.industry}</p>
        <p><span>CEO:</span>{data.ceo}</p>
        <p><span>Address:</span>{[data.address, data.zip, data.city, data.state, data.country].join()}</p>
        <p className="company-description">{data.description.length > 200? data.description.substring(0, 200)+"...":data.description}</p>
      </>
    </CustomModal>
  );
}

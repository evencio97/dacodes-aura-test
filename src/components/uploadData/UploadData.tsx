import { useState } from "react";
import CustomModal from "../CustomModal/CustomModal";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import "./UploadData.scss";

interface UploadDataPropsI {
  open: boolean;
  handlerClose: () => void;
}

export default function UploadData({ open, handlerClose }: UploadDataPropsI) {
  const checkboxesInitState = {
    all: false,
    industryConsultant: false,
    competidor: false,
    formerExecutive: false,
    customer: false,
    partner: false,
  }
  
  const [projectType, setProjectType] = useState("");
  const [checkboxesState, setCheckboxesState] = useState(checkboxesInitState);
  const checkboxesNames = Object.keys(checkboxesState);

  const handlerCloseWrapper = () => {
    // Init form
    (document.getElementById("#uploadDataForm") as (HTMLElement & { reset: () => void }) | null)?.reset();
    setCheckboxesState(checkboxesInitState);
    setProjectType("");

    handlerClose();
  }

  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: success message
    handlerCloseWrapper();
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    let result: any = {};
    // Special case
    if (name === "all") checkboxesNames.forEach((e) => (result[e] = checked));
    else {
      result = { ...checkboxesState, [name]: checked };
      // Uncheck all option if other got unchecked
      if (!checked && result.all) result.all = false;
      // Check all option if all others got checked
      else if (!checkboxesNames.find((e) => e !== "all" && result[e] === false))
        result.all = true;
    }
    setCheckboxesState(result);
  };

  const handleProjectTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProjectType(event.target.value);
  };

  return (
    <CustomModal id="upload-data-modal" open={open} handlerClose={handlerCloseWrapper}>
      <>
        <p className="upload-data-modal-title">New Data</p>
        <form
          className="text-left"
          id="uploadDataForm"
          onSubmit={handlerSubmit}
        >
          <div className="form-field">
            <span>
              Project Name<span>*</span>
            </span>
            <TextField
              name="projectName"
              placeholder="E.g. Microsoft Research"
              required
            />
          </div>
          <div className="form-field">
            <span>
              Project Type<span>*</span>
            </span>
            <TextField
              name="projectType"
              select
              placeholder="Select a project type"
              required
              value={projectType}
              onChange={handleProjectTypeChange}
            >
              <MenuItem value="Company Research">Company Research</MenuItem>
              <MenuItem value="Management Research">
                Management Research
              </MenuItem>
              <MenuItem value="Industry Research">Industry Research</MenuItem>
            </TextField>
          </div>
          {projectType === "Company Research" ? (
            <div className="form-field">
              <span>
                Companies<span>*</span>
              </span>
              <TextField
                name="companies"
                placeholder="E.g. Microsoft"
                required
              />
            </div>
          ) : null}
          <div className="form-field">
            <span>Project Description</span>
            <TextField
              name="projectDescription"
              placeholder="Please define the purpose for this project."
            />
          </div>
          <div className="form-field">
            <span>Project Scope</span>
            <TextField
              name="projectScope"
              placeholder="Tell us the range for the numbers of experts you want us to include for this research and the type of experts in order for us to start expert 
screening stage."
            />
          </div>
          <FormControl
            component="fieldset"
            variant="standard"
            className="checkboxes"
          >
            <FormLabel component="legend">
              Expert<span>*</span>
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkboxesState.all}
                    onChange={handleCheckboxChange}
                    name="all"
                  />
                }
                label="All"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkboxesState.industryConsultant}
                    onChange={handleCheckboxChange}
                    name="industryConsultant"
                  />
                }
                label="Industry Consultant"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkboxesState.competidor}
                    onChange={handleCheckboxChange}
                    name="competidor"
                  />
                }
                label="Competidor"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkboxesState.formerExecutive}
                    onChange={handleCheckboxChange}
                    name="formerExecutive"
                  />
                }
                label="Former Executive"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkboxesState.customer}
                    onChange={handleCheckboxChange}
                    name="customer"
                  />
                }
                label="Customer"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkboxesState.partner}
                    onChange={handleCheckboxChange}
                    name="partner"
                  />
                }
                label="Partner"
              />
            </FormGroup>
          </FormControl>
          <Button variant="outlined" className="btn-secundary" onClick={handlerCloseWrapper}>
            Cancel
          </Button>
          <Button variant="outlined" className="btn-primary" type="submit">
            Upload
          </Button>
        </form>
      </>
    </CustomModal>
  );
}

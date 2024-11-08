import React from "react";
import { IconButton, Modal } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import "./CustomModal.scss";

interface ModalPropsI {
  open: boolean, handlerClose: () => void,
  id: string, closeIcon?: boolean, children: React.JSX.Element
}

export default function CustomModal({ open, handlerClose, id, closeIcon = true, children }: ModalPropsI) {
  
  return (
    <Modal
      id={id}
      className="custom-modal"
      open={open}
      // @ts-ignore
      onClose={(event, reason) => handlerClose()}
      aria-labelledby={id+"-title"}
      aria-describedby={id+"-description"}
    >
      <div className="custom-modal-content">
        { closeIcon? (
            <IconButton aria-label="close" className="custom-modal-close-btn" onClick={handlerClose}>
              <CloseRoundedIcon />
            </IconButton>
          ) : null
        }
        {children}
      </div>
    </Modal>
  );
}

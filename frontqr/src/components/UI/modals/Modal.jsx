import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Componente de modal reutilizable
const CustomDialog = ({
 open,
 setOpen,
 title,
 content,
 primaryButtonText,
 primaryButtonAction,
 secondaryButtonText,
 secondaryButtonAction,
}) => {
 return (
    <Dialog
      open={open}
      onClose={setOpen}
      aria-labelledby="custom-dialog-title"
      aria-describedby="custom-dialog-description"
    >
      <DialogTitle id="custom-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="custom-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={secondaryButtonAction} color="primary">
          {secondaryButtonText}
        </Button>
        <Button onClick={primaryButtonAction} color="primary" autoFocus>
          {primaryButtonText}
        </Button>
      </DialogActions>
    </Dialog>
 );
};

export default CustomDialog;

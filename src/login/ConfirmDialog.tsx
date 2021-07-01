import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React from 'react';
import create from "zustand";

type ConfirmDialogStore = {
    message: string,
    onSubmit?: () => void;
    close: () => void;
}
const useConfirmDialogStore = create<ConfirmDialogStore>((set) => ({
    message: "",
    onSubmit: undefined,
    close: () => 
    set({
        onSubmit: undefined,
    }),
}));

export const confirmDialog = (message: string, onSubmit: () => void) => {
    useConfirmDialogStore.setState({
        message,
        onSubmit,
    });
};

const ConfirmDialog: React.FC = () => {
    const { message, onSubmit, close } = useConfirmDialogStore();
   
    return (
    <Dialog open={!!(onSubmit)} onClose={close} maxWidth="sm" fullWidth>
   <DialogTitle>Password Recovery</DialogTitle>
   <Box position="absolute" top={0} right={0}>
       <IconButton onClick={close}>
       <Close />
       </IconButton>
   </Box>
   <DialogContent>
       <DialogContentText>{message}</DialogContentText>
   </DialogContent>
   <DialogActions>
       <input type="text" className="text-box" placeholder="E-mail" />
       <Button color="primary" variant="contained" onClick={onSubmit}>
          Send
       </Button>
   </DialogActions>
    </Dialog>
    );
};

export default ConfirmDialog;
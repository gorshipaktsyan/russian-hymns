import { Dialog, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { setIsConfirmOpen } from '../../../redux/slice/historySlice';

export default function ConfirmModal({ handleClearHistory, dispatch, isConfirmOpen, lg }) {
  return (
    <Dialog open={isConfirmOpen} onClose={() => dispatch(setIsConfirmOpen(false))}>
      <DialogContent>
        <DialogContentText sx={{ color: 'black' }}>{lg.history.dialog}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => dispatch(setIsConfirmOpen(false))}>
          {lg.history.no}
        </Button>
        <Button onClick={handleClearHistory} autoFocus>
          {lg.history.yes}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

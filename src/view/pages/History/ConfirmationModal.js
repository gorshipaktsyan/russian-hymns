import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export default function ConfirmModal({ handleClear, setOpen, open }) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogContent>
        <DialogContentText>
          вы действительно хотите удалить всю историю?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setOpen(false)}>
          нет
        </Button>
        <Button onClick={handleClear} autoFocus>
          да
        </Button>
      </DialogActions>
    </Dialog>
  );
}

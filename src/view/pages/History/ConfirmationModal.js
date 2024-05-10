import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export default function ConfirmModal({
  handleClearHistory,
  setOpenConfirm,
  openConfirm,
  lg,
}) {
  return (
    <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
      <DialogContent>
        <DialogContentText sx={{ color: "black" }}>
          {lg.history.dialog}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setOpenConfirm(false)}>
          {lg.history.no}
        </Button>
        <Button onClick={handleClearHistory} autoFocus>
          {lg.history.yes}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

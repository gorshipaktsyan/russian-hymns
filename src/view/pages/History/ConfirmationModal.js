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
}) {
  return (
    <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
      <DialogContent>
        <DialogContentText sx={{ color: "black" }}>
          вы действительно хотите удалить всю историю?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setOpenConfirm(false)}>
          нет
        </Button>
        <Button onClick={handleClearHistory} autoFocus>
          да
        </Button>
      </DialogActions>
    </Dialog>
  );
}

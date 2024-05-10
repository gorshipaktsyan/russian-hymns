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
  language,
}) {
  return (
    <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
      <DialogContent>
        <DialogContentText sx={{ color: "black" }}>
          {language.history.dialog}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setOpenConfirm(false)}>
          {language.history.no}
        </Button>
        <Button onClick={handleClearHistory} autoFocus>
          {language.history.yes}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

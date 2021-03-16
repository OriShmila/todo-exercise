import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";

export const FormDialog = ({
  isOpen,
  onCancel,
  onConfirm,
  title,
  children,
}: FormDialogProps) => {
  const classes = useStyles();

  return (
    <Dialog open={isOpen} classes={{ paper: classes.root }}>
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          לחזרה
        </Button>
        <Button onClick={onConfirm} color="primary">
          לשמירה
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface FormDialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  children: JSX.Element;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      width: "40vw",
      height: "40vh",
    },
  },
}));

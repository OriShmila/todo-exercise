import { useState } from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import { useToggle } from "../../hooks";
import { FormDialog } from "../dialogs/form-dialog";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useUserActive } from "../../context-provider";
import { tasksService } from "../../services";

export const AdditionTask = ({ refetchTasks }: AdditionTaskProps) => {
  const [isOpen, open, close] = useToggle();
  const [value, setValue] = useState("");
  const { userActive } = useUserActive();
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const resetDialog = () => {
    setValue("");
    close();
  };

  const save = async () => {
    if (!userActive) {
      return;
    }

    await tasksService.createTask(userActive.id, value);
    resetDialog();
    refetchTasks();
  };

  return (
    <>
      <IconButton onClick={open}>
        <AddCircleOutlineIcon />
      </IconButton>
      <FormDialog
        isOpen={isOpen}
        onCancel={resetDialog}
        onConfirm={save}
        title="הוספת משימה"
      >
        <div className={classes.dialogContent}>
          <TextField
            multiline
            autoFocus
            margin="dense"
            id="description"
            type="text"
            value={value}
            onChange={handleChange}
            fullWidth
          />
        </div>
      </FormDialog>
    </>
  );
};

interface AdditionTaskProps {
  refetchTasks: () => Promise<void>;
}

const useStyles = makeStyles((theme: Theme) => ({
  dialogContent: {
    height: `calc(100% - ${theme.spacing(2)})`,
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
}));

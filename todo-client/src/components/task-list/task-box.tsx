import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import { ListItemIcon } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { Task, tasksService } from "../../services/tasks-service";

export const TaskBox = ({ task, refetchTasks }: TaskListProps) => {
  const classes = useStyles();

  const handleClick = async () => {
    await tasksService.updateCompeletedTask(task.id, !task.completed);

    refetchTasks();
  };

  const handleDeletedClick = async () => {
    await tasksService.deleteTask(task.id);

    refetchTasks();
  };

  return (
    <ListItem key={task.id} button onClick={handleClick}>
      <ListItemIcon>{task.completed && <CheckIcon />}</ListItemIcon>
      <ListItemText primary={task.description} />
      <ListItemSecondaryAction className={classes.listAction}>
        <IconButton onClick={handleDeletedClick}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

interface TaskListProps {
  task: Task;
  refetchTasks: () => Promise<void>;
}
const useStyles = makeStyles({
  listAction: {
    right: "0px",
  },
});

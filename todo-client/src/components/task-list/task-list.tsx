import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Task } from "../../services/tasks-service";
import { TaskBox } from "./task-box";

export const TaskList = ({ tasks, refetchTasks }: TaskListProps) => {
  const classes = useStyles();

  return (
    <List dense className={classes.root}>
      {tasks &&
        tasks.map((task) => (
          <TaskBox refetchTasks={refetchTasks} task={task} key={task.id} />
        ))}
    </List>
  );
};

interface TaskListProps {
  tasks: Task[] | null;
  refetchTasks: () => Promise<void>;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

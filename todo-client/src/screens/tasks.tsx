import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import CreateIcon from "@material-ui/icons/Create";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { AdditionTask } from "../components/addition-task";
import { TaskList } from "../components/task-list";
import { useEffect, useState } from "react";
import { useUserActive } from "../context-provider";
import { Task, tasksService } from "../services/tasks-service";

export const Tasks = () => {
  const classes = useStyles();
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const { userActive } = useUserActive();

  const fetchTasksByUser = async () => {
    if (!userActive) {
      return;
    }

    try {
      setTasks(await tasksService.fetchTasksBy(userActive.id));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchTasksByUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <CreateIcon />
      </Avatar>
      <Grid container alignItems="center">
        <Grid item xs={3} />
        <Grid item xs={6}>
          <Typography
            component="h1"
            variant="h5"
            className={classes.centeredItem}
          >
            רשימת משימות
          </Typography>
        </Grid>
        <Grid item xs={3} className={classes.leftItem}>
          <AdditionTask refetchTasks={fetchTasksByUser} />
        </Grid>
      </Grid>
      <TaskList tasks={tasks} refetchTasks={fetchTasksByUser} />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  centeredItem: {
    textAlign: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  leftItem: {
    textAlign: "end",
  },
}));

import { Switch, Redirect, Route, useHistory } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { useUserActive } from "./context-provider";
import "./App.css";
import { Login, Tasks } from "./screens";
import { TodoAppBar } from "./components/todo-app-bar";
import { Toolbar } from "@material-ui/core";
import { User } from "./services/users-service";

enum Routs {
  LOGIN = "/login",
  TASK_LIST = "/task-list",
}

const App = () => {
  const { userActive, setUserActive } = useUserActive();
  const history = useHistory();

  const handleLoginClicked = (user: User) => {
    setUserActive(user);

    history.push(Routs.TASK_LIST);
  };

  return (
    <>
      <TodoAppBar userLoginName={userActive?.name} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Toolbar />
        <Switch>
          <Route path={Routs.LOGIN}>
            <Login path={Routs.LOGIN} login={handleLoginClicked} />
          </Route>
          {userActive !== null && (
            <Route path={Routs.TASK_LIST}>
              <Tasks />
            </Route>
          )}
          <Redirect to={Routs.LOGIN} />
        </Switch>
      </Container>
    </>
  );
};

export default App;

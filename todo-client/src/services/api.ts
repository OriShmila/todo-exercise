import axios from "axios";

const url = process.env.REACT_APP_TODO_SERVER;

export default axios.create({
  baseURL: url,
  responseType: "json",
});

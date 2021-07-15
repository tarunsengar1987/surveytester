import axios from "axios";
import { getHeader } from "../00-surveytester/apiHelper";

//axios.defaults.withCredentials = true;

const baseURL = process.env.REACT_APP_SERVER;

export const fetchProjectsAPI = async () => {
  return await axios.get(
    `${baseURL}/API/V2/projects.ashx?method=getProjectList`,
    getHeader()
  );
};
